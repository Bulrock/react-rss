import { ILikeRepository } from './types';

export default class LocalStorageLikeRepository implements ILikeRepository {
  findLike = (key: number) => {
    const keys = localStorage.getItem('likesArr');
    const keysArr: number[] = keys ? JSON.parse(keys) : [];
    return keysArr.some((keyId) => keyId === key) ? true : false;
  };

  add = (key: number) => {
    const keys = localStorage.getItem('likesArr');
    const keysArr: number[] = keys ? JSON.parse(keys) : [];
    keysArr.push(key);
    localStorage.setItem('likesArr', JSON.stringify(keysArr));
  };

  remove = (key: number) => {
    const keys = localStorage.getItem('likesArr');
    const keysArr: number[] = keys ? JSON.parse(keys) : [];

    const arr = keysArr.filter((element) => element !== key);
    localStorage.setItem('likesArr', JSON.stringify(arr));
  };
}
