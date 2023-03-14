import { unmountComponentAtNode } from 'react-dom';
// import { waitFor } from '@testing-library/react';
import { server } from '../mocks/server';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import BooksService from '../../src/components/BooksService';
// import { IBook } from '../../src/models/types';

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

describe('Books Service', () => {
  it('handleBooksFetched with provided wrong search value return empty value', async () => {
    const booksService = new BooksService();
    const books = await booksService.getBooks('qwert');
    expect(books).toHaveLength(0);
  });

  it('handleBooksFetched with provided valid search value return not empty value', async () => {
    const booksService = new BooksService();
    const books = await booksService.getBooks('DOME');
    expect(books).toHaveLength(2);
  });
});
