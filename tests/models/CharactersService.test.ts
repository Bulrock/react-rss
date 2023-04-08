import { unmountComponentAtNode } from 'react-dom';
import { server } from '../mocks/server';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import CharactersService from '../../src/models/CharactersService';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement('div') as HTMLDivElement;
  document.body.appendChild(container);
  server.listen();
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
  server.resetHandlers();
  server.close();
});

describe('CharactersService Service', () => {
  it('handlePersonsFetched with provided wrong search value return null', async () => {
    const charactersService = CharactersService(false);
    const persons = await charactersService('qwert');
    expect(persons).toEqual(undefined);
  });

  it('throws an error with provided valid search value and an error in the API response', async () => {
    const charactersService = CharactersService(false);

    try {
      await charactersService('reject');
    } catch (error) {
      expect((error as Error).message).toEqual('There is nothing here');
    }
  });

  it('handlePersonsFetched with provided valid search value return not empty value', async () => {
    const charactersService = CharactersService(false);
    const persons = await charactersService('kyle');
    expect(persons).toHaveLength(1);
  });

  it('handlePersonsFetched with provided id return single character', async () => {
    const charactersService = CharactersService(true);
    const persons = await charactersService('11111');
    if (persons !== undefined && !Array.isArray(persons) && !('error' in persons)) {
      expect(persons.name).toBe('Single');
    }
  });
});
