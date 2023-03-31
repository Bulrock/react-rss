import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from '../../src/components/FormField';
import { IFormFieldProps } from '../../src/models/types';

describe('FormField', () => {
  const mockProps: IFormFieldProps = {
    formField: {
      type: 'text',
      labels: ['Name'],
      ids: ['name'],
      register: 'name',
      placeholder: 'Enter your name',
      required: 'Name is required',
    },
    errors: {},
    register: jest.fn(),
  };

  it('renders a text input', () => {
    render(<FormField {...mockProps} key={0} />);

    const inputElement = screen.getByTestId(mockProps.formField.ids[0]);
    expect(inputElement).toBeInTheDocument();
  });
});
