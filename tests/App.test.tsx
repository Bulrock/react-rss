import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/app/store';

import App from '../src/App';

describe('App', () => {
  test('renders home page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    waitFor(() => {
      expect(screen.getByText('The Rick and Morty Universe')).toBeInTheDocument();
    });
  });

  test('renders about page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('What is this?')).toBeInTheDocument();
  });

  test('renders form page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/form']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('What is this?')).toBeInTheDocument();
  });

  test('renders not found page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/non-existent-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
