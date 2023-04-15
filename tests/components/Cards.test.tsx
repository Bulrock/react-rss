import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Cards from '../../src/components/Cards';
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
});

const mockPersonArray = [
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

const mockPerson = {
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

describe('Cards component', () => {
  const onCharacterCardClick = jest.fn();
  const setModalActive = jest.fn();
  const canDraw = true;

  it('renders cards from array of cards', () => {
    render(
      <Provider store={store}>
        <Cards
          canDraw={canDraw}
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          characters={mockPersonArray}
          key={String(mockPersonArray[0].id)}
        />
      </Provider>
    );

    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });

  it('renders card from one card', () => {
    render(
      <Provider store={store}>
        <Cards
          canDraw={canDraw}
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          characters={mockPerson}
          key={String(mockPerson.id)}
        />
      </Provider>
    );

    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });

  // it('do not render cards on characters equal undefined', () => {
  //   render(
  //     <Cards
  //       canDraw={canDraw}
  //       onCharacterCardClick={onCharacterCardClick}
  //       setModalActive={setModalActive}
  //       characters={undefined}
  //       key={999999999}
  //     />
  //   );

  //   waitFor(() => {
  //     expect(screen.getByTestId('error-message-container')).toBeInTheDocument();
  //   });
  // });
});
