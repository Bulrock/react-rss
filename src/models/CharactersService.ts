import fetch from 'node-fetch';
import { ICharacter, ICharactersResult, IError } from './types';

export default function CharactersService(isIdPassed: boolean) {
  const apiUrl = 'https://rickandmortyapi.com/api';
  const path = isIdPassed ? '/character/' : '/character/?name=';

  return async function getCharacters(
    query: string | null
  ): Promise<ICharacter[] | ICharacter | undefined | IError> {
    const searchCharacter = `${apiUrl}${path}${query}`;
    try {
      const response = await fetch(searchCharacter);
      if (response.status === 404) {
        throw new Error('Character not found');
      } else {
        const responseAPI: ICharacter | ICharactersResult | IError = await response.json();
        if ('results' in responseAPI) {
          return responseAPI.results;
        } else if ('error' in responseAPI) {
          return responseAPI;
        } else if (!('error' in responseAPI) && !('results' in responseAPI)) {
          return responseAPI;
        }
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
}
