import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import AboutPage from '../../src/pages/AboutPage';

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

describe('About Page', () => {
  it('renders about page', () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );
    const aboutTitle = screen.getByTestId('about-h1');
    const aboutParagraph = screen.getByTestId('about-p');
    const searchBar = screen.queryByTestId('search-test');

    expect(aboutTitle).toBeInTheDocument();
    expect(aboutParagraph).toBeInTheDocument();
    expect(searchBar).toBe(null);
  });
});
