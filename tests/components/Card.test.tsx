import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Card from '../../src/components/Card';

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

const mockBook = {
  id: 1,
  title: 'Test Book',
  subtitle: 'Test Subtitle',
  price: '$10.00',
  image: 'test-image.jpg',
  isbn13: '9781098103828',
  url: 'https://itbook.store/books/9781098103828',
};

describe('Card component', () => {
  it('renders book information and buttons', () => {
    const { getByText, getByAltText } = render(<Card book={mockBook} key="1" />);
    const bookSubtitle = screen.getByTestId('book-subt');

    expect(getByText(mockBook.title)).toBeInTheDocument();
    expect(bookSubtitle).toBeEmpty;
    expect(getByText(mockBook.price)).toBeInTheDocument();
    expect(getByAltText('book image')).toHaveAttribute('src', mockBook.image);
    expect(getByText('Show details')).toBeInTheDocument();
    expect(getByText('Show info')).toBeInTheDocument();
  });

  it('toggles book subtitle on details button click', () => {
    const { getByText } = render(<Card book={mockBook} key="1" />);
    const detailsButton = getByText('Show details');
    const bookSubtitle = screen.getByTestId('book-subt');

    fireEvent.click(detailsButton);

    expect(bookSubtitle).not.toBeEmpty;

    fireEvent.click(detailsButton);

    expect(bookSubtitle).toBeEmpty;
  });

  // it('toggles book information on info button click', () => {
  //   const { queryByText } = render(<Card book={mockBook} key="1" />);
  //   const infoButton = queryByText('Show info');

  //   if (infoButton) {
  //     fireEvent.click(infoButton);
  //     expect(queryByText(/Views: \d+/)).toBeInTheDocument();
  //   } else {
  //     console.warn('Info button not found');
  //   }

  //   if (infoButton) {
  //     fireEvent.click(infoButton);
  //     expect(queryByText(`Views: 0`)).toBeVisible();
  //   }
  // });

  it('increases likes on like button click', () => {
    const { getByAltText, getByText } = render(<Card book={mockBook} key="1" />);
    const likeButton = getByAltText('like image');

    fireEvent.click(likeButton);

    expect(getByText('1')).toBeInTheDocument();
  });
});
