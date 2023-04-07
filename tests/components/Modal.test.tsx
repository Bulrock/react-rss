import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Modal from '../../src/components/Modal';

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

describe('Modal', () => {
  const setActive = jest.fn();
  const mockCharacterAlive = {
    id: 283,
    name: 'Rick D. Sanchez III',
    status: 'Dead',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/283.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/28'],
    url: 'https://rickandmortyapi.com/api/character/283',
    created: '2017-12-31T19:23:53.188Z',
  };

  const mockCharacterDead = {
    id: 283,
    name: 'Rick D. Sanchez III',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/283.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/28'],
    url: 'https://rickandmortyapi.com/api/character/283',
    created: '2017-12-31T19:23:53.188Z',
  };

  it('should render a modal window with active class and modal Card of dead character', () => {
    const { getByTestId, getByText } = render(
      <Modal
        isModalError={false}
        isFetching={false}
        characterModal={mockCharacterAlive}
        active={true}
        setActive={setActive}
      />
    );
    expect(getByTestId('modal')).toHaveClass('modal active');
    expect(getByText('Rick D. Sanchez III')).toBeInTheDocument();
    expect(getByText('Dead - Human')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
    expect(getByText('Citadel of Ricks')).toBeInTheDocument();
    expect(getByText('2017-12-31')).toBeInTheDocument();
    expect(getByTestId('person-status-ico')).toHaveClass('status-icon-red');
  });

  it('should render a modal window with active class and modal Card of alive character', () => {
    const { getByTestId, getByText } = render(
      <Modal
        isModalError={false}
        isFetching={false}
        characterModal={mockCharacterDead}
        active={true}
        setActive={setActive}
      />
    );
    expect(getByTestId('modal')).toHaveClass('modal active');
    expect(getByText('Rick D. Sanchez III')).toBeInTheDocument();
    expect(getByText('Alive - Human')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
    expect(getByText('Citadel of Ricks')).toBeInTheDocument();
    expect(getByText('2017-12-31')).toBeInTheDocument();
    expect(getByTestId('person-status-ico')).toHaveClass('status-icon-green');
  });

  it('should render a modal window without active class', () => {
    const { getByTestId } = render(
      <Modal
        isModalError={false}
        isFetching={false}
        characterModal={undefined}
        active={false}
        setActive={setActive}
      />
    );
    expect(getByTestId('modal')).toHaveClass('modal');
  });

  it('should be closed on close button click', () => {
    const { getByTestId } = render(
      <Modal
        isModalError={false}
        isFetching={false}
        characterModal={undefined}
        active={true}
        setActive={setActive}
      />
    );

    expect(getByTestId('modal')).toHaveClass('modal active');
    fireEvent.click(screen.getByTestId('modal-close-btn'));
    expect(getByTestId('modal')).toHaveClass('modal');
    expect(setActive).toHaveBeenCalled();
  });

  it('should be closed on background click', () => {
    const { getByTestId } = render(
      <Modal
        isModalError={false}
        isFetching={false}
        characterModal={undefined}
        active={true}
        setActive={setActive}
      />
    );

    expect(getByTestId('modal')).toHaveClass('modal active');
    fireEvent.click(screen.getByTestId('modal'));
    expect(getByTestId('modal')).toHaveClass('modal');
    expect(setActive).toHaveBeenCalled();
  });
});
