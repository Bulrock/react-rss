import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from '../../components/FormField';
import { IFormFieldProps } from '../../models/types';
import { vi } from 'vitest';

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
    register: vi.fn(),
  };

  it('renders a text input', () => {
    render(<FormField {...mockProps} key={0} />);

    const inputElement = screen.getByTestId(mockProps.formField.ids[0]);
    expect(inputElement).toBeInTheDocument();
  });
});
