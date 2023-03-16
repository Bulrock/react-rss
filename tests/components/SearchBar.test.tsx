import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import SearchBar from '../../src/components/SearchBar';

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
    const { getByTestId } = render(<SearchBar />);
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('search-btn')).toBeInTheDocument();
  });

  it('should call handleSearchClick when the search button is clicked', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchInput = getByTestId('search-input');
    const searchButton = getByTestId('search-btn');
    fireEvent.change(searchInput, { target: { value: null } });
    fireEvent.click(searchButton);
    expect(localStorage.getItem('search')).toBe(null);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);
    expect(localStorage.getItem('search')).toBe('test');
  });

  it('should update the search input value when the user types', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchInput = getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });

  it('should save the search input value to local storage when the user types', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(localStorage.getItem('search')).toBe('test');
  });
});
