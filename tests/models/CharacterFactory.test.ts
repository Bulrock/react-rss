import 'jest';
import { waitFor } from '@testing-library/react';
import CharacterFactory from '../../src/models/CharacterFactory';
import { ICharacter } from '../../src/models/types';

let characterFactory: CharacterFactory;

beforeAll(async () => {
  await waitFor(() => {
    characterFactory = new CharacterFactory();
  });
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('Character Factory creates a character object with the expected properties and values', async () => {
  const values = [
    'Rick Sanchez',
    'Alive',
    'Human',
    'Male',
    'Earth (C-137)',
    'Earth (Replacement Dimension)',
    'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    '2017-11-04',
  ];
  let character: ICharacter;

  await waitFor(
    () => {
      character = characterFactory.create(values);
    },
    { timeout: 1500 }
  ).then(() => {
    expect(character.id).toBeDefined();
    expect(character.name).toBe('Rick Sanchez');
    expect(character.status).toBe('Alive');
    expect(character.species).toBe('Human');
    expect(character.type).toBe('');
    expect(character.gender).toBe('Male');
    expect(character.origin.name).toBe('Earth (C-137)');
    expect(character.origin.url).toBe('');
    expect(character.location.name).toBe('Earth (Replacement Dimension)');
    expect(character.location.url).toBe('https://rickandmortyapi.com/api/location/6');
    expect(character.image).toBe('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
    expect(character.episode).toEqual(['https://rickandmortyapi.com/api/episode/19']);
    expect(character.url).toBeDefined();
    expect(character.created).toBe('2017-11-04');
  });
});

test('Character Factory creates a character object with a unique id', () => {
  const values1 = [
    'Rick Sanchez',
    'Alive',
    'Human',
    'Male',
    'Earth (C-137)',
    'Earth (Replacement Dimension)',
    'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    '2017-11-04T18:48:46.250Z',
  ];
  const values2 = [
    'Morty Smith',
    'Alive',
    'Human',
    'Male',
    'Earth (C-137)',
    'Earth (Replacement Dimension)',
    'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    '2017-11-04T18:48:46.250Z',
  ];
  const character1: ICharacter = characterFactory.create(values1);
  const character2: ICharacter = characterFactory.create(values2);
  expect(character1.id).not.toEqual(character2.id);
});
