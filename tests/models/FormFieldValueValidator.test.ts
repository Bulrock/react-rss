import 'jest';
import { waitFor } from '@testing-library/react';
import FormFieldValueValidator from '../../src/models/FormFieldValueValidator';

export const validationRules = [
  [
    {
      rule: '.{2,}',
      errorMessage: 'Please enter a name longer than 1 character',
    },
    {
      rule: '^[A-Z]',
      errorMessage: 'Name should start with a capital letter',
    },
  ],
  [
    {
      rule: 'required',
      errorMessage: 'Chose a character status',
    },
  ],
  [
    {
      rule: 'date',
      errorMessage: 'It looks like you are a time traveller. Date of creation can not be in future',
    },
    {
      rule: 'required',
      errorMessage: 'Date of creation is required',
    },
  ],
];

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Form Field Value Validator', () => {
  it('validates input type text fields', async () => {
    let formFieldValueValidator: FormFieldValueValidator;
    await waitFor(() => {
      formFieldValueValidator = new FormFieldValueValidator(validationRules[0]);
    }).then(() => {
      expect(formFieldValueValidator.validate('')).toBe(validationRules[0][0].errorMessage);
      expect(formFieldValueValidator.validate('rick Sanchez')).toBe(
        validationRules[0][1].errorMessage
      );
      expect(formFieldValueValidator.validate('R')).toBe(validationRules[0][0].errorMessage);
      expect(formFieldValueValidator.validate('Rick Sanchez')).toBe('');
    });
  });

  it('validates input type radio, select, checkbox with required status', async () => {
    let formFieldValueValidator: FormFieldValueValidator;
    await waitFor(() => {
      formFieldValueValidator = new FormFieldValueValidator(validationRules[1]);
    }).then(() => {
      expect(formFieldValueValidator.validate('')).toBe(validationRules[1][0].errorMessage);
      expect(formFieldValueValidator.validate('Alive')).toBe('');
    });
  });

  it('validates input type data', async () => {
    let formFieldValueValidator: FormFieldValueValidator;
    await waitFor(() => {
      formFieldValueValidator = new FormFieldValueValidator(validationRules[2]);
    }).then(() => {
      expect(formFieldValueValidator.validate('')).toBe(validationRules[2][1].errorMessage);
      expect(formFieldValueValidator.validate('2024-01-01')).toBe(
        validationRules[2][0].errorMessage
      );
      expect(formFieldValueValidator.validate('2020-01-01')).toBe('');
    });
  });
});
