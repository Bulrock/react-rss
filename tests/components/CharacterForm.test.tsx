import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { FormFields } from '../../src/data/CharacterFormMetadata';
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
    const onSubmit = jest.fn((character) => {
      submitedICharacter = character;
    });

    const file = new File(['(⌐□_□)'], 'Rick.png', { type: 'image/png' });

    render(<CharacterForm formFields={FormFields} onSubmit={onSubmit} />);

    userEvent.type(screen.getByTestId('me'), 'Morty-Shmorty');
    userEvent.click(screen.getByTestId('radio-0'));
    userEvent.selectOptions(screen.getByTestId('species'), ['Alien']);
    userEvent.selectOptions(screen.getByTestId('gender'), ['Male']);
    userEvent.type(screen.getByTestId('ig'), 'Earth');
    userEvent.type(screen.getByTestId('st'), 'Mars');
    userEvent.upload(screen.getByTestId('ag') as HTMLInputElement, file);
    userEvent.type(screen.getByTestId('te'), '2017-11-04');
    userEvent.click(screen.getByTestId('co'));

    const submitButton = screen.getByTestId('form-submit-btn');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(submitedICharacter).toBeDefined();
      },
      { timeout: 2005 }
    );
  });

  it('should not return Icharacter on submit with incorrectly filled form', async () => {
    window.URL.createObjectURL = jest.fn();

    let submitedICharacter: ICharacter;
    const onSubmit = jest.fn((character) => {
      submitedICharacter = character;
    });

    render(<CharacterForm formFields={FormFields} onSubmit={onSubmit} />);

    userEvent.type(screen.getByTestId('me'), 'Morty-Shmorty');
    userEvent.click(screen.getByTestId('radio-0'));
    userEvent.selectOptions(screen.getByTestId('species'), ['Alien']);
    userEvent.selectOptions(screen.getByTestId('gender'), ['Male']);
    userEvent.type(screen.getByTestId('ig'), 'Earth');
    userEvent.type(screen.getByTestId('st'), 'Mars');
    userEvent.type(screen.getByTestId('te'), '2017-11-04');
    userEvent.click(screen.getByTestId('co'));

    const submitButton = screen.getByTestId('form-submit-btn');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(submitedICharacter).toBeUndefined();
      },
      { timeout: 2005 }
    );
  });
});
