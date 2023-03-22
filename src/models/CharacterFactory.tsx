import { ICharacter } from './types';
import UuidGenerator from './UuidGenerator';

export default class CharacterFactory {
  private UuidGenerator = new UuidGenerator();
  create(values: string[]): ICharacter {
    const uuid = this.UuidGenerator.generateUuid();
    return {
      id: Number(uuid),
      name: values[0],
      status: values[1],
      species: values[2],
      type: '',
      gender: values[3],
      origin: {
        name: values[4],
        url: '',
      },
      location: {
        name: values[5],
        url: 'https://rickandmortyapi.com/api/location/6',
      },
      image: values[6],
      episode: ['https://rickandmortyapi.com/api/episode/19'],
      url: `https://rickandmortyapi.com/api/character/${uuid}`,
      created: values[7],
    };
  }
}
