import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { server } from '../mocks/server';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import HomePage from '../../src/pages/HomePage';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement('div') as HTMLDivElement;
  document.body.appendChild(container);
  server.listen();
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
  server.resetHandlers();
  server.close();
});

describe('Home Page', () => {
  const onCharacterCardClick = jest.fn();
  const setModalActive = jest.fn();
  it('renders home page with navigation and Search Bar in header and default 4 cards', () => {
    act(() => {
      render(
        <BrowserRouter>
          <HomePage onCharacterCardClick={onCharacterCardClick} setModalActive={setModalActive} />
        </BrowserRouter>
      );
    });

    const aboutTitle = screen.getByTestId('home-h1');
    const searchBar = screen.queryByTestId('search-test');
    const cardList = screen.queryAllByTestId('card');

    waitFor(() => {
      expect(aboutTitle).toBeInTheDocument();
      expect(cardList).not.toHaveLength(0);
      expect(searchBar).not.toBe(null);
    });
  });

  it('handlePersonsFetched with provided search value on search button click', async () => {
    render(
      <BrowserRouter>
        <HomePage
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          data-testid="home-page"
        />
      </BrowserRouter>
    );

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    const searchButton = screen.getByTestId('search-btn') as HTMLButtonElement;

    fireEvent.change(searchInput, { target: { value: 'kyle' } });
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByText('Kyle'));
  });
});
