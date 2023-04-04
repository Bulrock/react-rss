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
    const charactersService = CharactersService();
    const persons = await charactersService('qwert');
    expect(persons).toEqual(null);
  });

  it('handlePersonsFetched with provided valid search value return not empty value', async () => {
    const charactersService = CharactersService();
    const persons = await charactersService('kyle');
    expect(persons).toHaveLength(1);
  });
});
