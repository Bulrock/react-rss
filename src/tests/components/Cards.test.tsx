import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Cards from '../../components/Cards';
import { Provider } from 'react-redux';
import { storeSetup } from '../../app/store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

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

const errorResult: FetchBaseQueryError = {
  status: 'CUSTOM_ERROR',
  data: '{}',
  error: 'Something went wrong',
};

const id = '123';

describe('Cards component', () => {
  const onCharacterCardClick = vi.fn();
  const setModalActive = vi.fn();
  const canDraw = true;
  const store = storeSetup();

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

  it('renders error message', async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <Cards
          canDraw={canDraw}
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          characters={errorResult}
          key={id}
        />
      </Provider>
    );

    const message = await findByTestId('error-message-container');
    await waitFor(() => {
      expect(message).toBeInTheDocument();
    });
  });
});
