import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import FormPage from '../../src/pages/FormPage';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement('div') as HTMLDivElement;
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
  jest.useRealTimers();
});

describe('Form Page', () => {
  it('renders form page', () => {
    render(
      <BrowserRouter>
        <FormPage />
      </BrowserRouter>
    );
    const header = screen.getByTestId('header-test');
    const formTitle = screen.getByTestId('form-h1');
    const footer = screen.getByTestId('footer-test');
    const formLink = screen.getByTestId('form-link');

    expect(header).toBeInTheDocument();
    expect(formTitle).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(formLink).toHaveStyle(`color: 'blue'`);
    expect(screen.queryByTestId('search-test')).toBe(null);
  });

  it('handle submit character form', async () => {
    const file = new File(['(⌐□_□)'], 'Rick.png', { type: 'image/png' });

    render(
      <BrowserRouter>
        <FormPage />
      </BrowserRouter>
    );

    act(() => {
      userEvent.type(screen.getByTestId('me'), 'Morty-Shmorty');
      userEvent.click(screen.getByTestId('radio-0'));
      userEvent.selectOptions(screen.getByTestId('species'), ['Alien']);
      userEvent.selectOptions(screen.getByTestId('gender'), ['Male']);
      userEvent.type(screen.getByTestId('ig'), 'Earth');
      userEvent.type(screen.getByTestId('st'), 'Mars');
      userEvent.upload(screen.getByTestId('ag') as HTMLInputElement, file);
      userEvent.type(screen.getByTestId('te'), '2017-11-04');
      userEvent.click(screen.getByTestId('co'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('me')).toHaveValue('Morty-Shmorty');
      expect(screen.getByTestId('radio-0')).toBeChecked();
      expect(screen.getByTestId('ig')).toHaveValue('Earth');
      expect(screen.getByTestId('st')).toHaveValue('Mars');
      expect(screen.getByTestId('te')).toHaveValue('2017-11-04');
      expect(screen.getByTestId('co')).toBeChecked();
    });

    const message = screen.getByTestId('submit-message');
    expect(message).toHaveClass('notsubmit-message');
    const submitButton = screen.getByTestId('form-submit-btn');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(message).toHaveClass('submit-message');
      },
      { timeout: 1005 }
    );
  });
});
