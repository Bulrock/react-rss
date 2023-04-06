import fetch from 'node-fetch';
import { ICharacter, ICharacterResult } from './types';

export default function CharactersService(isIdPassed: boolean) {
  const apiUrl = 'https://rickandmortyapi.com/api';
  const path = isIdPassed ? '/character/' : '/character/?name=';

  return async function getCharacters(query: string | null): Promise<ICharacter[] | null> {
    const searchCharacter = `${apiUrl}${path}${query}`;
    try {
      const response = await fetch(searchCharacter);
      if (response.status === 404) {
        throw new Error('Character not found');
      } else {
        const characterResult: ICharacterResult = await response.json();
        if (characterResult.results) {
          return characterResult.results;
        } else {
          throw new Error(characterResult.error || 'Unknown error occurred');
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
