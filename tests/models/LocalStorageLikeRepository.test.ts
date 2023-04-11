import 'jest';
import StateLikeRepository from '../../src/models/StateLikeRepository';

let likeRepository: StateLikeRepository;
beforeAll(() => {
  likeRepository = new StateLikeRepository();
  localStorage.clear();
});

beforeEach(() => {
  localStorage.clear();
});

describe('Local Storage Like Repository', () => {
  it('remove likes properly', () => {
    likeRepository.remove(4);
    expect(localStorage.getItem('likesArr')).toEqual('[]');

    const keysArr = [4];
    localStorage.setItem('likesArr', JSON.stringify(keysArr));

    likeRepository.remove(4);
    expect(likeRepository.findLike(4)).toBe(false);
  });

  it('finds likes properly', () => {
    const keysArr = [1, 2];
    localStorage.setItem('likesArr', JSON.stringify(keysArr));

    expect(likeRepository.findLike(3)).toBe(false);
    expect(likeRepository.findLike(2)).toBe(true);
  });

  it('add likes properly', () => {
    let keysArr: number[] = [];
    localStorage.setItem('likesArr', JSON.stringify(keysArr));
    const keys = localStorage.getItem('likesArr');
    keysArr = keys ? JSON.parse(keys) : [];

    expect(keysArr.length).toBe(0);
    likeRepository.add(2);
    expect(likeRepository.findLike(2)).toBe(true);
  });
});
