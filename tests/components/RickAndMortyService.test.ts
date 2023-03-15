import { unmountComponentAtNode } from 'react-dom';
import { server } from '../mocks/server';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import RickAndMortyService from '../../src/components/RickAndMortyService';
import { persons as personData } from '../../src/data/data';

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

describe('RickAndMortyService Service', () => {
  it('handlePersonsFetched with provided wrong search value return default 4 data cards', async () => {
    const rickAndMortyService = new RickAndMortyService();
    const persons = await rickAndMortyService.getPersons('qwert');
    expect(persons).toEqual(personData);
  });

  it('handlePersonsFetched with provided valid search value return not empty value', async () => {
    const rickAndMortyService = new RickAndMortyService();
    const persons = await rickAndMortyService.getPersons('kyle');
    expect(persons).toHaveLength(1);
  });
});
