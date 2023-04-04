import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Card from '../../src/components/Card';
import LocalStorageLikeRepository from '../../src/models/LocalStorageLikeRepository';

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

describe('Card component', () => {
  const onCharacterCardClick = jest.fn();
  const setModalActive = jest.fn();
  it('renders person information', () => {
    const { getByText, getByAltText } = render(
      <Card
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        character={mockPerson}
        key={String(mockPerson.id)}
      />
    );

    expect(getByText(mockPerson.name)).toBeInTheDocument();
    expect(getByText(`${mockPerson.status} - ${mockPerson.species}`)).toBeInTheDocument();
    expect(getByAltText('person image')).toHaveAttribute('src', mockPerson.image);
  });

  it('show modal window on characterCard click', () => {
    render(
      <Card
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        character={mockPerson}
        key="1"
      />
    );
    const characterCard = screen.getByTestId('card');

    fireEvent.click(characterCard);

    expect(setModalActive).toHaveBeenCalledWith(true);
  });

  it('show error message container on character equal null', () => {
    render(
      <Card
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        character={null}
        key="1"
      />
    );

    expect(screen.getByTestId('error-message-container')).toBeInTheDocument();
  });

  it('dont show modal window on characterCard click', () => {
    render(
      <Card
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        character={mockPerson}
        key="1"
      />
    );
    const characterCard = screen.getByTestId('card');

    fireEvent.click(characterCard);

    expect(setModalActive).toHaveBeenCalledWith(true);
  });

  it('increase number of views on character Card click', () => {
    render(
      <Card
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        character={mockPerson}
        key="1"
      />
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
      <Card
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        character={mockPerson}
        key="1"
      />
    );
    const likeButton = getByAltText('like image');

    fireEvent.click(likeButton);
    expect(screen.getByTestId('likes').textContent).toBe('1');
    fireEvent.click(likeButton);
    expect(screen.getByTestId('likes').textContent).toBe('0');
  });

  it('should render likes count as 1 when person is already liked', () => {
    const likeRepository = new LocalStorageLikeRepository();
    likeRepository.add(mockPerson.id);
    render(
      <Card
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        character={mockPerson}
      />
    );

    const likes = screen.getByTestId('likes');
    expect(likes.textContent).toBe('1');
  });

  it('should render likes count as 0 when person is not liked', () => {
    const likeRepository = new LocalStorageLikeRepository();
    likeRepository.remove(mockPerson.id);
    render(
      <Card
        onCharacterCardClick={onCharacterCardClick}
        setModalActive={setModalActive}
        character={mockPerson}
      />
    );

    const likes = screen.getByTestId('likes');
    expect(likes.textContent).toBe('0');
  });
});
