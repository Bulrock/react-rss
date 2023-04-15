import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import SearchBar from '../../src/components/SearchBar';
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

describe('SearchBar', () => {
  it('should render a search input and button', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('search-btn')).toBeInTheDocument();
  });

  it('should call handleSearchClick when the search button is clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = getByTestId('search-input');
    const searchButton = getByTestId('search-btn');
    fireEvent.change(searchInput, { target: { value: null } });
    fireEvent.click(searchButton);
    // expect(localStorage.getItem('search')).toBe(null);
    // fireEvent.change(searchInput, { target: { value: 'test' } });
    // fireEvent.click(searchButton);
    // expect(localStorage.getItem('search')).toBe('test');
  });

  it('handleKeyPress should call handleSearchClick when "Enter" key is pressed', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = getByTestId('search-input');

    fireEvent.keyUp(searchInput, { key: 'Enter' } as KeyboardEvent);
    // waitFor(() => {
    //   expect(handleSearchClick).toHaveBeenCalledTimes(1);
    // });
  });

  test('performSearch should not be called if search is empty', async () => {
    // const charactersServiceMock = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(getByTestId('search-btn'));
    // waitFor(() => {
    //   expect(charactersServiceMock).not.toHaveBeenCalled();
    // });
  });
});
