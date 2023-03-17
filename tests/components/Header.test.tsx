import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Header from '../../src/components/Header';

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

describe('Header component', () => {
  it('renders header with 2 links: Home, About and search bar', () => {
    render(
      <Router>
        <Header hideSearch={false} />
      </Router>
    );
    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');
    const formLink = screen.getByTestId('form-link');
    const searchBar = screen.getByTestId('search-test');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(formLink).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
  });

  it('change color of the links', () => {
    render(
      <Router>
        <Header hideSearch={false} />
      </Router>
    );
    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');
    const formLink = screen.getByTestId('form-link');

    fireEvent.click(aboutLink);

    expect(homeLink).not.toHaveClass('active');
    expect(homeLink).not.toHaveStyle(`text-decoration: none; color: blue;`);
    expect(aboutLink).toHaveClass('active');
    expect(aboutLink).toHaveStyle(`text-decoration: none; color: blue;`);
    expect(formLink).not.toHaveClass('active');
    expect(formLink).not.toHaveStyle(`text-decoration: none; color: blue;`);
  });
});
