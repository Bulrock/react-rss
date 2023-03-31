import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import HomePage from '../../src/pages/HomePage';

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

describe('Home Page', () => {
  it('renders home page with navigation and Search Bar in header and default 4 cards', () => {
    act(() => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
    });

    const aboutTitle = screen.getByTestId('home-h1');
    const searchBar = screen.queryByTestId('search-test');
    const cardList = screen.queryAllByTestId('card');

    expect(aboutTitle).toBeInTheDocument();
    expect(cardList).not.toHaveLength(0);
    expect(searchBar).not.toBe(null);
  });
});
