import { ICharacter } from './types';

export default class CharacterFactory {
  create(values: string[]): ICharacter {
    return {
      id: Number(values[0]),
      name: values[1],
      status: values[2],
      species: values[3],
      type: '',
      gender: values[4],
      origin: {
        name: values[5],
        url: '',
      },
      location: {
        name: values[6],
        url: 'https://rickandmortyapi.com/api/location/6',
      },
      image: values[7],
      episode: ['https://rickandmortyapi.com/api/episode/19'],
      url: `https://rickandmortyapi.com/api/character/${values[0]}`,
      created: values[8],
    };
  }
}
