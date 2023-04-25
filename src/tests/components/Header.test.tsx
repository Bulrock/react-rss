import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import Header from '../../components/Header';
import { Provider } from 'react-redux';
import { storeSetup } from '../../app/store';

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
  const store = storeSetup();

  it('renders header with 2 links: Home, About and search bar', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');
    const formLink = screen.getByTestId('form-link');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(formLink).toBeInTheDocument();
  });

  it('change color of the links', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
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

  it('change links styles', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const homeLink = screen.getByTestId('home-link');
    const aboutLink = screen.getByTestId('about-link');
    const formLink = screen.getByTestId('form-link');

    expect(homeLink).toHaveStyle('color: blue');
    expect(aboutLink).not.toHaveStyle('color: blue');
    expect(formLink).not.toHaveStyle('color: blue');

    act(() => {
      userEvent.click(aboutLink);
    });

    expect(homeLink).not.toHaveStyle('color: blue');
    expect(aboutLink).toHaveStyle('color: blue');
    expect(formLink).not.toHaveStyle('color: blue');

    act(() => {
      userEvent.click(formLink);
    });

    expect(homeLink).not.toHaveStyle('color: blue');
    expect(aboutLink).not.toHaveStyle('color: blue');
    expect(formLink).toHaveStyle('color: blue');
  });
});
