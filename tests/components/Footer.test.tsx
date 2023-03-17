import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Footer from '../../src/components/Footer';

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

describe('Footer component', () => {
  it('renders footer with icon, logo and text', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = screen.getByTestId('footer-test');
    const iconGithub = screen.getByTestId('github-icon');
    const logoSchool = screen.getByTestId('logo');
    const text = screen.getByTestId('copyrights');

    expect(footer).toBeInTheDocument();
    expect(iconGithub).toBeInTheDocument();
    expect(logoSchool).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
