import 'jest';
import LocalStorageViewRepository from '../../src/models/LocalStorageViewRepository';

let viewRepository: LocalStorageViewRepository;
beforeAll(() => {
  viewRepository = new LocalStorageViewRepository();
  localStorage.clear();
});

beforeEach(() => {
  localStorage.clear();
});

describe('Local Storage View Repository', () => {
  it('remove views properly', () => {
    viewRepository.remove(4);
    expect(localStorage.getItem('viewsArr')).toEqual('[]');

    const keysArr = [4];
    localStorage.setItem('viewsArr', JSON.stringify(keysArr));

    viewRepository.remove(4);
    expect(viewRepository.findView(4)).toBe(false);
  });

  it('finds views properly', () => {
    const keysArr = [1, 2];
    localStorage.setItem('viewsArr', JSON.stringify(keysArr));

    expect(viewRepository.findView(3)).toBe(false);
    expect(viewRepository.findView(1)).toBe(true);
  });

  it('add views properly', () => {
    let keysArr: number[] = [];
    localStorage.setItem('viewsArr', JSON.stringify(keysArr));
    const keys = localStorage.getItem('viewsArr');
    keysArr = keys ? JSON.parse(keys) : [];

    expect(keysArr.length).toBe(0);
    viewRepository.add(2);
    expect(viewRepository.findView(2)).toBe(true);
  });
});
