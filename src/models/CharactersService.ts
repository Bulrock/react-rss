import fetch from 'node-fetch';
import { characters } from '../data/Characters';

export default function CharactersService() {
  const apiUrl = 'https://rickandmortyapi.com/api';

  return async function getCharacters(query: string) {
    const searchCharacter = apiUrl + '/character/?name=' + query;
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
      return characters;
    }
  };
}
