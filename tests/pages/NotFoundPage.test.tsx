import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import NotFoundPage from '../../src/pages/NotFoundPage';
import { Provider } from 'react-redux';
import store from '../../src/app/store';

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
});

describe('Not Found Page', () => {
  it('renders not found page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </Provider>
    );
    const notFoundTitle = screen.getByTestId('not-found-h1');
    const notFoundParagraph = screen.getByTestId('not-found-p');
    const searchBar = screen.queryByTestId('search-test');
    const homeLink = screen.getByTestId('not-found-link');

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundParagraph).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(searchBar).toBe(null);
  });
});
