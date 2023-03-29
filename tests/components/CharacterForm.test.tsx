import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import CharacterForm from '../../src/components/CharacterForm';
import { ICharacter } from '../../src/models/types';

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement('div') as HTMLDivElement;
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
  jest.clearAllMocks();
});

describe('CharacterForm', () => {
  it('should return Icharacter on submit with correctly filled form', async () => {
    window.URL.createObjectURL = jest.fn();

    let submitedICharacter: ICharacter;
    const onSubmit = jest.fn((character: ICharacter) => {
      submitedICharacter = character;
    });

    const file = new File(['(⌐□_□)'], 'Rick.png', { type: 'image/png' });
    await act(async () => render(<CharacterForm onSuccessSubmit={onSubmit} />));

    await act(async () => {
      userEvent.type(await screen.findByTestId('name'), 'Morty-Shmorty');
      userEvent.click(await screen.findByTestId('status-0'));
      userEvent.selectOptions(await screen.findByTestId('species'), ['Alien']);
      userEvent.selectOptions(await screen.findByTestId('gender'), ['Male']);
      userEvent.type(await screen.findByTestId('origin'), 'Earth');
      userEvent.type(await screen.findByTestId('location'), 'Mars');
      userEvent.upload((await screen.findByTestId('image')) as HTMLInputElement, file);
      userEvent.type(await screen.findByTestId('date'), '2017-11-04');
      userEvent.click(await screen.findByTestId('checkbox'));
    });

    await act(async () => {
      const submitButton = await screen.findByTestId('form-submit-btn');
      fireEvent.click(submitButton);
    });

    await waitFor(
      async () => {
        expect(submitedICharacter).not.toBeDefined();
      },
      { timeout: 2000 }
    );
  });

  it('should not return Icharacter on submit with incorrectly filled form', async () => {
    window.URL.createObjectURL = jest.fn();

    let submitedICharacter: ICharacter;
    const onSubmit = jest.fn((character: ICharacter) => {
      submitedICharacter = character;
    });

    await act(async () => render(<CharacterForm onSuccessSubmit={onSubmit} />));

    await act(async () => {
      userEvent.type(screen.getByTestId('name'), 'Morty-Shmorty');
      userEvent.click(screen.getByTestId('status-0'));
      userEvent.selectOptions(screen.getByTestId('species'), ['Alien']);
      userEvent.selectOptions(screen.getByTestId('gender'), ['Male']);
      userEvent.type(screen.getByTestId('origin'), 'Earth');
      userEvent.type(screen.getByTestId('location'), 'Mars');
      userEvent.type(screen.getByTestId('date'), '2017-11-04');
      userEvent.click(screen.getByTestId('checkbox'));
    });

    const submitButton = screen.getByTestId('form-submit-btn');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(
      () => {
        expect(submitedICharacter).toBeUndefined();
      },
      { timeout: 500 }
    );
  });
});
