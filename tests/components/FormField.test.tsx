import { unmountComponentAtNode } from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { IFormProps } from '../../src/models/types';
import FormField from '../../src/components/FormField';
import FormFieldValueValidator from '../../src/models/FormFieldValueValidator';

let container: HTMLDivElement | null = null;
let FormFields: IFormProps[];

beforeAll(() => {
  FormFields = [
    {
      element: 'input',
      label: 'Name: ',
      type: 'text',
      validator: new FormFieldValueValidator([
        {
          rule: '.{2,}',
          errorMessage: 'Please enter a name longer than 1 character',
        },
        {
          rule: '^[A-Z]',
          errorMessage: 'Name should start with a capital letter',
        },
      ]),
    },
    {
      element: 'radio',
      type: 'radio',
      name: 'status',
      options: ['Alive', 'Dead'],
      validator: new FormFieldValueValidator([
        {
          rule: 'required',
          errorMessage: 'Chose a character status',
        },
      ]),
    },
    {
      element: 'select',
      label: 'Species: ',
      type: 'select',
      options: ['', 'Animal', 'Human'],
      validator: new FormFieldValueValidator([
        {
          rule: 'required',
          errorMessage: 'Select a species from the dropdown',
        },
      ]),
    },
  ];
});

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

describe('FormField', () => {
  it('should render input', async () => {
    const textField = new FormField(FormFields[0]);
    expect(textField.fieldValue).toBe('');

    await waitFor(() => {
      render(textField.render());
      userEvent.type(screen.getByTestId('me'), 'Morty-Shmorty');
    });

    await waitFor(() => {
      expect(screen.queryByTestId('me')).toHaveValue('Morty-Shmorty');
      expect(screen.queryByTestId('me')).toHaveAttribute('data-testid', 'me');
    });
  });

  it('should be ability to get field value', async () => {
    const textField = new FormField(FormFields[0]);

    await waitFor(() => {
      render(textField.render());
      userEvent.type(screen.getByTestId('me'), 'Morty-Shmorty');
    });

    await waitFor(() => {
      expect(textField.fieldValue).toBe('Morty-Shmorty');
    });
  });

  it('should be ability to reset fields value', async () => {
    const textField = new FormField(FormFields[0]);
    const selectField = new FormField(FormFields[2]);
    const radioFields = new FormField(FormFields[1]);

    expect(radioFields.radioRefs.length).toBe(2);

    await waitFor(() => {
      render(textField.render());
      render(selectField.render());
      render(radioFields.render());
      userEvent.type(screen.getByTestId('me'), 'Morty-Shmorty');
      userEvent.selectOptions(screen.getByTestId('species'), ['Animal']);
      userEvent.click(screen.getByTestId('radio-0'));
    });

    await waitFor(() => {
      expect(textField.fieldValue).toBe('Morty-Shmorty');
      expect(selectField.fieldValue).toBe('Animal');
      expect(radioFields.fieldValue).toBe('Alive');
    });

    await waitFor(() => {
      textField.reset();
      selectField.reset();
      radioFields.reset();
      expect(textField.fieldValue).toBe('');
      expect(selectField.fieldValue).toBe('');
      expect(radioFields.fieldValue).toBe('');
    });
  });
});
