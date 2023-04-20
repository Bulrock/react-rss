import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../mocks/server';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import HomePage from '../../pages/HomePage';
import { Provider } from 'react-redux';
import { storeSetup } from '../../app/store';

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
  const store = storeSetup();

  it('renders home page with navigation and Search Bar in header and roller on fetching start Card list', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const homePage = screen.getByTestId('home-page-component');
    const searchBar = screen.queryByTestId('search-test');
    const roller = screen.getByTestId('roller');

    waitFor(() => {
      expect(homePage).toBeInTheDocument();
      expect(roller).toBeInTheDocument();
      expect(searchBar).not.toBe(null);
    });
  });

  it('show modal window on characterCard click with active style and can be closed by either modal backgound or cross', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    const searchButton = screen.getByTestId('search-btn') as HTMLButtonElement;

    fireEvent.change(searchInput, { target: { value: 'kyle' } });
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByText('Kyle'));

    const characterCard = screen.getByTestId('card');

    fireEvent.click(characterCard);
    waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveClass('modal active');
      expect(screen.getByText("Kyle's Teenyverse")).toBeInTheDocument();
    });
  });

  it('handlePersonsFetched with provided search value on search button click', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    const searchButton = screen.getByTestId('search-btn') as HTMLButtonElement;

    fireEvent.change(searchInput, { target: { value: 'kyle' } });
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByText('Kyle'));
  });
});
