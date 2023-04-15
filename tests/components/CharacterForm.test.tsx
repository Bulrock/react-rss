import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import CharacterForm from '../../src/components/CharacterForm';
import { ICharacter } from '../../src/models/types';
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
  jest.clearAllMocks();
});

describe('CharacterForm', () => {
  it('renders correctly', async () => {
    const { getByLabelText, getByTestId, getByRole } = render(
      <Provider store={store}>
        <CharacterForm />
      </Provider>
    );
    waitFor(() => {
      expect(getByLabelText('Name:')).toBeInTheDocument();
      expect(getByTestId('status-0')).toBeInTheDocument();
      expect(getByLabelText('Species:')).toBeInTheDocument();
      expect(getByLabelText('Gender:')).toBeInTheDocument();
      expect(getByLabelText('Origin planet of birth:')).toBeInTheDocument();
      expect(getByLabelText('Last known location:')).toBeInTheDocument();
      expect(getByLabelText('Image:')).toBeInTheDocument();
      expect(getByLabelText('Date of character creation:')).toBeInTheDocument();
      expect(getByLabelText('I consent to this data')).toBeInTheDocument();
      expect(getByRole('button')).toBeInTheDocument();
    });
  });

  it('should not return Icharacter on submit with incorrectly filled form', async () => {
    let submitedICharacter: ICharacter;

    const { getByTestId } = render(
      <Provider store={store}>
        <CharacterForm />
      </Provider>
    );

    userEvent.type(getByTestId('name'), 'Morty');

    const submitButton = getByTestId('form-submit-btn');

    fireEvent.click(submitButton);

    waitFor(() => {
      expect(submitedICharacter).toBeUndefined();
    });
  });

  it('should return Icharacter on submit with correctly filled form', async () => {
    let submitedICharacter: ICharacter;

    const { getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <CharacterForm />
      </Provider>
    );

    fireEvent.change(getByLabelText('Name:'), { target: { value: 'Rick Sanchez' } });
    fireEvent.click(getByTestId('status-0'));
    fireEvent.change(getByLabelText('Species:'), { target: { value: 'Human' } });
    fireEvent.change(getByLabelText('Gender:'), { target: { value: 'Male' } });
    fireEvent.change(getByLabelText('Origin planet of birth:'), {
      target: { value: 'Earth' },
    });
    fireEvent.change(getByLabelText('Last known location:'), { target: { value: 'Earth' } });
    fireEvent.change(getByLabelText('Image:'), {
      target: { files: [new File(['test'], 'test.png', { type: 'image/png' })] },
    });
    fireEvent.change(getByLabelText('Date of character creation:'), {
      target: { value: '2022-01-01' },
    });
    fireEvent.click(getByLabelText('I consent to this data'));

    fireEvent.click(getByTestId('form-submit-btn'));

    waitFor(() => {
      expect(submitedICharacter).toBeDefined();
    });
  });

  it('should return errors on submit with empty form fields', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <CharacterForm />
      </Provider>
    );

    fireEvent.click(getByTestId('form-submit-btn'));

    await waitFor(() => {
      expect(getByText('Name is required')).toBeInTheDocument();
      expect(getByText('Status is required')).toBeInTheDocument();
      expect(getByText('Species is required')).toBeInTheDocument();
      expect(getByText('Gender is required')).toBeInTheDocument();
      expect(getByText('Origin planet name is required')).toBeInTheDocument();
      expect(getByText('Last known location is required')).toBeInTheDocument();
      expect(getByText('Select character image')).toBeInTheDocument();
      expect(getByText('Select date of creation')).toBeInTheDocument();
      expect(getByText('Confirm information publishing before submitting')).toBeInTheDocument();
    });
  });

  it('submits the form correctly with message and reset the form', async () => {
    const { getByLabelText, getByTestId, findByTestId, getByRole } = render(
      <Provider store={store}>
        <CharacterForm />
      </Provider>
    );
    const submitButton = getByRole('button');

    fireEvent.change(getByLabelText('Name:'), { target: { value: 'Rick Sanchez' } });
    fireEvent.click(getByTestId('status-0'));
    fireEvent.change(getByLabelText('Species:'), { target: { value: 'Human' } });
    fireEvent.change(getByLabelText('Gender:'), { target: { value: 'Male' } });
    fireEvent.change(getByLabelText('Origin planet of birth:'), {
      target: { value: 'Earth' },
    });
    fireEvent.change(getByLabelText('Last known location:'), { target: { value: 'Earth' } });
    fireEvent.change(getByLabelText('Image:'), {
      target: { files: [new File(['test'], 'test.png', { type: 'image/png' })] },
    });
    fireEvent.change(getByLabelText('Date of character creation:'), {
      target: { value: '2022-01-01' },
    });
    fireEvent.click(getByLabelText('I consent to this data'));

    fireEvent.submit(submitButton);
    const submitMessage = await findByTestId('submit-message');
    await waitFor(() => {
      expect(submitMessage).not.toHaveClass('submit-message');
    });

    await waitFor(() => {
      expect(submitMessage).toHaveTextContent(/Data has been saved/i);
      expect(submitMessage).toHaveClass('notsubmit-message');
    });

    waitFor(() => {
      expect(submitMessage).not.toHaveTextContent(/Data has been saved/i);
      expect(submitMessage).not.toHaveClass('submit-message');
      expect(getByLabelText('Name:')).toHaveValue('Rick Sanchez');
      expect(getByTestId('status-0')).not.toBeChecked();
      expect(getByLabelText('Species:')).toHaveValue('');
      expect(getByLabelText('Gender:')).toHaveValue('');
      expect(getByLabelText('Origin planet of birth:')).toHaveValue('');
      expect(getByLabelText('Last known location:')).toHaveValue('');
      expect(getByLabelText('Image:') as HTMLInputElement).toHaveValue('');
      expect(getByLabelText('Date of character creation:')).toHaveValue('');
      expect(getByLabelText('I consent to this data')).not.toBeChecked();
    });
  });
});
