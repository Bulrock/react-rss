import fetch from 'node-fetch';
import { persons } from '../data/data';

export default class CharacterService {
  apiUrl = 'https://rickandmortyapi.com/api';

  async getPersons(query: string) {
    const searchCharacter = this.apiUrl + '/character/?name=' + query;
    try {
      const response = await fetch(searchCharacter);
      if (response.status === 404) {
        throw new Error('Person not found');
      } else {
        const character = await response.json();
        if (character.results) {
          return character.results;
        } else {
          console.log(character.error);
        }
      }
    } catch (error) {
      console.log(error);
      return persons;
    }
  }
}
