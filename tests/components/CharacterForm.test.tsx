import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import CharacterForm from '../../src/components/CharacterForm';
import { ICharacter } from '../../src/models/types';

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
    render(<CharacterForm onSuccessSubmit={jest.fn()} />);
    waitFor(() => {
      expect(screen.getByLabelText('Name:')).toBeInTheDocument();
      expect(screen.getByTestId('status-0')).toBeInTheDocument();
      expect(screen.getByLabelText('Species:')).toBeInTheDocument();
      expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
      expect(screen.getByLabelText('Origin planet of birth:')).toBeInTheDocument();
      expect(screen.getByLabelText('Last known location:')).toBeInTheDocument();
      expect(screen.getByLabelText('Image:')).toBeInTheDocument();
      expect(screen.getByLabelText('Date of character creation:')).toBeInTheDocument();
      expect(screen.getByLabelText('I consent to this data')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('should not return Icharacter on submit with incorrectly filled form', async () => {
    window.URL.createObjectURL = jest.fn();

    let submitedICharacter: ICharacter;
    const onSubmit = jest.fn((character: ICharacter) => {
      submitedICharacter = character;
    });

    render(<CharacterForm onSuccessSubmit={onSubmit} />);

    userEvent.type(screen.getByTestId('name'), 'Morty');

    const submitButton = screen.getByTestId('form-submit-btn');

    fireEvent.click(submitButton);

    waitFor(() => {
      expect(submitedICharacter).toBeUndefined();
    });
  });

  it('should return Icharacter on submit with correctly filled form', async () => {
    let submitedICharacter: ICharacter;
    const onSuccessSubmitMock = jest.fn((character: ICharacter) => {
      submitedICharacter = character;
    });

    render(<CharacterForm onSuccessSubmit={onSuccessSubmitMock} />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Rick Sanchez' } });
    fireEvent.click(screen.getByTestId('status-0'));
    fireEvent.change(screen.getByLabelText('Species:'), { target: { value: 'Human' } });
    fireEvent.change(screen.getByLabelText('Gender:'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('Origin planet of birth:'), {
      target: { value: 'Earth' },
    });
    fireEvent.change(screen.getByLabelText('Last known location:'), { target: { value: 'Earth' } });
    fireEvent.change(screen.getByLabelText('Image:'), {
      target: { files: [new File(['test'], 'test.png', { type: 'image/png' })] },
    });
    fireEvent.change(screen.getByLabelText('Date of character creation:'), {
      target: { value: '2022-01-01' },
    });
    fireEvent.click(screen.getByLabelText('I consent to this data'));

    fireEvent.click(screen.getByTestId('form-submit-btn'));

    waitFor(() => {
      expect(submitedICharacter).toBeDefined();
    });
  });

  it('should return errors on submit with empty form fields', async () => {
    window.URL.createObjectURL = jest.fn();

    render(<CharacterForm onSuccessSubmit={jest.fn()} />);

    fireEvent.click(screen.getByTestId('form-submit-btn'));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Status is required')).toBeInTheDocument();
      expect(screen.getByText('Species is required')).toBeInTheDocument();
      expect(screen.getByText('Gender is required')).toBeInTheDocument();
      expect(screen.getByText('Origin planet name is required')).toBeInTheDocument();
      expect(screen.getByText('Last known location is required')).toBeInTheDocument();
      expect(screen.getByText('Select character image')).toBeInTheDocument();
      expect(screen.getByText('Select date of creation')).toBeInTheDocument();
      expect(
        screen.getByText('Confirm information publishing before submitting')
      ).toBeInTheDocument();
    });
  });

  it('submits the form correctly with message and reset the form', async () => {
    const onSuccessSubmitMock = jest.fn();
    render(<CharacterForm onSuccessSubmit={onSuccessSubmitMock} />);
    const submitButton = screen.getByRole('button');

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Rick Sanchez' } });
    fireEvent.click(screen.getByTestId('status-0'));
    fireEvent.change(screen.getByLabelText('Species:'), { target: { value: 'Human' } });
    fireEvent.change(screen.getByLabelText('Gender:'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('Origin planet of birth:'), {
      target: { value: 'Earth' },
    });
    fireEvent.change(screen.getByLabelText('Last known location:'), { target: { value: 'Earth' } });
    fireEvent.change(screen.getByLabelText('Image:'), {
      target: { files: [new File(['test'], 'test.png', { type: 'image/png' })] },
    });
    fireEvent.change(screen.getByLabelText('Date of character creation:'), {
      target: { value: '2022-01-01' },
    });
    fireEvent.click(screen.getByLabelText('I consent to this data'));

    fireEvent.submit(submitButton);
    const submitMessage = await screen.findByTestId('submit-message');
    waitFor(() => {
      expect(submitMessage).toHaveClass('submit-message');
    });

    waitFor(() => {
      expect(submitMessage).toHaveTextContent(/Data has been saved/i);
      expect(submitMessage).toHaveClass('notsubmit-message');
    });

    waitFor(() => {
      expect(submitMessage).not.toHaveTextContent(/Data has been saved/i);
      expect(submitMessage).toHaveClass('submit-message');
      expect(screen.getByLabelText('Name:')).toHaveValue('Rick Sanchez');
      expect(screen.getByTestId('status-0')).not.toBeChecked();
      expect(screen.getByLabelText('Species:')).toHaveValue('');
      expect(screen.getByLabelText('Gender:')).toHaveValue('');
      expect(screen.getByLabelText('Origin planet of birth:')).toHaveValue('');
      expect(screen.getByLabelText('Last known location:')).toHaveValue('');
      expect(screen.getByLabelText('Image:') as HTMLInputElement).toHaveValue('');
      expect(screen.getByLabelText('Date of character creation:')).toHaveValue('');
      expect(screen.getByLabelText('I consent to this data')).not.toBeChecked();
      expect(onSuccessSubmitMock).toHaveBeenCalledTimes(1);
    });
  });

  it('handle submit character form', async () => {
    const onSuccessSubmitMock = jest.fn();
    const { getByTestId } = render(<CharacterForm onSuccessSubmit={onSuccessSubmitMock} />);

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

    waitFor(
      () => {
        expect(onSuccessSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSuccessSubmitMock).toHaveBeenCalledWith({ name: 'Morty' });
      },
      { timeout: 2000 }
    );
  });
});
