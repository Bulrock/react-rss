import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import Card from '../../src/components/Card';

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
  it('renders person information and buttons', () => {
    const { getByText, getByAltText } = render(
      <Card person={mockPerson} key={String(mockPerson.id)} />
    );
    const personDetails = screen.getByTestId('person-loc');

    expect(getByText(mockPerson.name)).toBeInTheDocument();
    expect(getByText(`${mockPerson.status} - ${mockPerson.species}`)).toBeInTheDocument();
    expect(personDetails).toBeEmpty;
    expect(getByAltText('person image')).toHaveAttribute('src', mockPerson.image);
    expect(getByText('Show details')).toBeInTheDocument();
    expect(getByText('Show info')).toBeInTheDocument();
  });

  it('toggles person details on details button click', () => {
    const { getByText } = render(<Card person={mockPerson} key="1" />);
    const detailsButton = getByText('Show details');
    const personDetails = screen.getByTestId('person-loc');

    fireEvent.click(detailsButton);

    expect(personDetails).not.toBeEmpty;

    fireEvent.click(detailsButton);

    expect(personDetails).toBeEmpty;
  });

  it('increase number of views on person info button click', () => {
    const { queryByText } = render(<Card person={mockPerson} key="1" />);
    const infoButton = queryByText('Show info');
    const views = screen.getByTestId('views');

    if (infoButton) {
      const prevValue = views.textContent;
      fireEvent.click(infoButton);
      const currValue = views.textContent;
      expect(Number(currValue) - Number(prevValue)).toBe(1);
    }
  });

  it('increases likes on like button click', () => {
    const { getByAltText, getByText } = render(<Card person={mockPerson} key="1" />);
    const likeButton = getByAltText('like image');

    fireEvent.click(likeButton);

    expect(getByText('1')).toBeInTheDocument();
  });
});
