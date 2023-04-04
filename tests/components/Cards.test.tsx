import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Cards from '../../src/components/Cards';

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

const mockPerson = [
  {
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
  },
];

describe('Cards component', () => {
  const onCharacterCardClick = jest.fn();
  const setModalActive = jest.fn();
  it('renders cards', () => {
    render(
      <Cards
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        characters={mockPerson}
        key={String(mockPerson[0].id)}
      />
    );

    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });

  it('do not render cards on characters equal null', () => {
    render(
      <Cards
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        characters={null}
        key={999999999}
      />
    );

    expect(screen.getByTestId('error-message-container')).toBeInTheDocument();
  });
});
