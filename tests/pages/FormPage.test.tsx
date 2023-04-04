import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import FormPage from '../../src/pages/FormPage';

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
  const onCharacterCardClick = jest.fn();
  const setModalActive = jest.fn();

  it('renders form page', () => {
    render(
      <BrowserRouter>
        <FormPage onCharacterCardClick={onCharacterCardClick} setModalActive={setModalActive} />
      </BrowserRouter>
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

  it('handle submit character form', async () => {
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <FormPage onCharacterCardClick={onCharacterCardClick} setModalActive={setModalActive} />
      </BrowserRouter>
    );

    const file = new File(['test'], 'Rick.png', { type: 'image/png' });

    fireEvent.change(getByTestId('name'), { target: { value: 'Morty' } });
    fireEvent.click(getByTestId('status-0'));
    fireEvent.change(getByTestId('species'), { target: { value: 'Alien' } });
    fireEvent.change(getByTestId('gender'), { target: { value: 'Male' } });
    fireEvent.change(getByTestId('origin'), { target: { value: 'Earth' } });
    fireEvent.change(getByTestId('location'), { target: { value: 'Mars' } });
    fireEvent.change(getByTestId('image'), { target: { files: [file] } });
    fireEvent.change(getByTestId('date'), { target: { value: '2017-11-04' } });
    fireEvent.click(getByTestId('checkbox'));

    fireEvent.click(getByTestId('form-submit-btn'));

    waitFor(
      () => {
        expect(getByText('Morty')).toBeInTheDocument();
        expect(getByTestId('status-0')).toBeChecked();
        expect(getByTestId('origin')).toHaveValue('Earth');
        expect(getByTestId('location')).toHaveValue('Mars');
        expect(getByTestId('date')).toHaveValue('2017-11-04');
        expect(getByTestId('checkbox')).toBeChecked();
      },
      { timeout: 2000 }
    );
  });

  it('submits the form correctly with message and reset the form', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <FormPage onCharacterCardClick={onCharacterCardClick} setModalActive={setModalActive} />
      </BrowserRouter>
    );

    const file = new File(['test'], 'Rick.png', { type: 'image/png' });

    fireEvent.change(getByTestId('name'), { target: { value: 'Morty' } });
    fireEvent.click(getByTestId('status-0'));
    fireEvent.change(getByTestId('species'), { target: { value: 'Alien' } });
    fireEvent.change(getByTestId('gender'), { target: { value: 'Male' } });
    fireEvent.change(getByTestId('origin'), { target: { value: 'Earth' } });
    fireEvent.change(getByTestId('location'), { target: { value: 'Mars' } });
    fireEvent.change(getByTestId('date'), { target: { value: '2017-11-04' } });
    fireEvent.click(getByTestId('checkbox'));
    fireEvent.change(getByTestId('image'), { target: { files: [file] } });

    fireEvent.click(getByTestId('form-submit-btn'));

    const submitMessage = waitFor(() => screen.getByTestId('submit-message'));

    waitFor(
      () => {
        expect(submitMessage).toHaveTextContent(/Data has been saved/i);
      },
      { timeout: 1500 }
    );

    waitFor(() => {
      expect(screen.getByLabelText('Name:')).toHaveValue('');
      expect(screen.getByTestId('status-0')).not.toBeChecked();
      expect(screen.getByLabelText('Species:')).toHaveValue('');
      expect(screen.getByLabelText('Gender:')).toHaveValue('');
      expect(screen.getByLabelText('Origin planet of birth:')).toHaveValue('');
      expect(screen.getByLabelText('Last known location:')).toHaveValue('');
      expect(screen.getByLabelText('Image:') as HTMLInputElement).toHaveValue('');
      expect(screen.getByLabelText('Date of character creation:')).toHaveValue('');
      expect(screen.getByLabelText('I consent to this data')).not.toBeChecked();
      expect(screen.getByLabelText('card')).not.toBeChecked();
    });
  });
});
