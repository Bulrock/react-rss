import { ICharacter } from './types';

export default class CharacterFormValueCardAdapter {
  formCard(formValueArr: string[]): ICharacter {
    return {
      id: Number(formValueArr[0]),
      name: formValueArr[1],
      status: formValueArr[2],
      species: formValueArr[3],
      type: '',
      gender: formValueArr[4],
      origin: {
        name: formValueArr[5],
        url: '',
      },
      location: {
        name: formValueArr[6],
        url: 'https://rickandmortyapi.com/api/location/6',
      },
      image: formValueArr[7],
      episode: ['https://rickandmortyapi.com/api/episode/19'],
      url: `https://rickandmortyapi.com/api/character/${formValueArr[0]}`,
      created: formValueArr[8],
    };
  }
}
