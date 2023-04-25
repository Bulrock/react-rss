import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import FormPage from '../../pages/FormPage';
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

describe('Form Page', () => {
  const store = storeSetup();

  it('renders form page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormPage />
        </BrowserRouter>
      </Provider>
    );

    const header = screen.getByTestId('header-test');
    const formTitle = screen.getByTestId('form-h1');
    const footer = screen.getByTestId('footer-test');
    const formLink = screen.getByTestId('form-link');

    expect(header).toBeInTheDocument();
    expect(formTitle).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(formLink).toHaveStyle(`color: 'blue'`);
    expect(screen.queryByTestId('search-test')).toBe(null);
  });
});
