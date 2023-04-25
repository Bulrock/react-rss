import { ICharactersFetchState } from '../../models/types';
import reducer, { updateSearchResults } from '../../features/CharactersSlice';

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

const mockPersonSecond = {
  id: 2,
  name: 'Rick',
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

describe('CharactersSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ searchResults: [] });
  });

  test('should handle a new character added to an empty array', () => {
    const previousState: ICharactersFetchState = { searchResults: [] };

    expect(reducer(previousState, updateSearchResults([mockPerson]))).toEqual({
      searchResults: [
        {
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
        },
      ],
    });
  });

  test('should handle a new character being added to an existing array', () => {
    const previousState: ICharactersFetchState = {
      searchResults: [
        {
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
        },
      ],
    };

    expect(reducer(previousState, updateSearchResults([mockPersonSecond]))).toEqual({
      searchResults: [
        {
          id: 2,
          name: 'Rick',
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
        },
      ],
    });
  });
});
