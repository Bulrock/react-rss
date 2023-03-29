import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
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
    act(() => {
      render(
        <BrowserRouter>
          <FormPage />
        </BrowserRouter>
      );
    });

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

    act(() => {
      render(
        <BrowserRouter>
          <FormPage />
        </BrowserRouter>
      );
    });

    act(() => {
      userEvent.type(screen.getByTestId('name'), 'Morty-Shmorty');
      userEvent.click(screen.getByTestId('status-0'));
      userEvent.selectOptions(screen.getByTestId('species'), ['Alien']);
      userEvent.selectOptions(screen.getByTestId('gender'), ['Male']);
      userEvent.type(screen.getByTestId('origin'), 'Earth');
      userEvent.type(screen.getByTestId('location'), 'Mars');
      userEvent.upload(screen.getByTestId('image') as HTMLInputElement, file);
      userEvent.type(screen.getByTestId('date'), '2017-11-04');
      userEvent.click(screen.getByTestId('checkbox'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('name')).toHaveValue('Morty-Shmorty');
      expect(screen.getByTestId('status-0')).toBeChecked();
      expect(screen.getByTestId('origin')).toHaveValue('Earth');
      expect(screen.getByTestId('location')).toHaveValue('Mars');
      expect(screen.getByTestId('date')).toHaveValue('2017-11-04');
      expect(screen.getByTestId('checkbox')).toBeChecked();
    });
  });
});
