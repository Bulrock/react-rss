import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Card from '../../src/components/Card';
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

const mockPerson = {
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

describe('Card component', () => {
  const onCharacterCardClick = jest.fn();
  const setModalActive = jest.fn();
  const canDraw = true;
  it('renders person information', () => {
    const { getByText, getByAltText, getByTestId } = render(
      <Provider store={store}>
        <Card
          canDraw={canDraw}
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          character={mockPerson}
          key={String(mockPerson.id)}
        />
      </Provider>
    );

    expect(getByText(mockPerson.name)).toBeInTheDocument();
    expect(getByText(`${mockPerson.status} - ${mockPerson.species}`)).toBeInTheDocument();
    expect(getByAltText('person image')).toHaveAttribute('src', mockPerson.image);
    expect(getByTestId('status-icon')).toHaveClass('status-icon-green');
  });

  it('show modal window on characterCard click', () => {
    render(
      <Provider store={store}>
        <Card
          canDraw={canDraw}
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          character={mockPerson}
          key="1"
        />
      </Provider>
    );
    const characterCard = screen.getByTestId('card');

    fireEvent.click(characterCard);

    expect(setModalActive).toHaveBeenCalledWith(true);
  });

  it('dont show modal window on characterCard click', () => {
    render(
      <Provider store={store}>
        <Card
          canDraw={canDraw}
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          character={mockPerson}
          key="1"
        />
      </Provider>
    );
    const characterCard = screen.getByTestId('card');

    fireEvent.click(characterCard);

    expect(setModalActive).toHaveBeenCalledWith(true);
  });

  it('increase number of views on character Card click', () => {
    render(
      <Provider store={store}>
        <Card
          canDraw={canDraw}
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          character={mockPerson}
          key="1"
        />
      </Provider>
    );
    const characterCard = screen.getByTestId('card');
    const views = screen.getByTestId('views');

    const prevValue = views.textContent;
    fireEvent.click(characterCard);
    const currValue = views.textContent;
    waitFor(() => {
      expect(Number(currValue) - Number(prevValue)).toBe(1);
    });
  });

  it('increases and decrease likes on like button click', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <Card
          canDraw={canDraw}
          onCharacterCardClick={onCharacterCardClick}
          setModalActive={setModalActive}
          character={mockPerson}
          key="1"
        />
      </Provider>
    );
    const likeButton = getByAltText('like image');

    fireEvent.click(likeButton);
    expect(screen.getByTestId('likes').textContent).toBe('1');
    fireEvent.click(likeButton);
    expect(screen.getByTestId('likes').textContent).toBe('0');
  });
});
