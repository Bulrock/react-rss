import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Roller from '../../src/components/Roller';

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

describe('Card component', () => {
  it('renders roller', () => {
    const { getByTestId } = render(<Roller classRoller={'lds-roller-modal lds-roller'} />);

    expect(getByTestId('roller')).toBeInTheDocument();
  });
});
