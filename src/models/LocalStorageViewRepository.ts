import { IViewRepository } from './types';

export default class LocalStorageViewRepository implements IViewRepository {
  findView = (key: number) => {
    const keys = localStorage.getItem('viewsArr');
    const keysArr: number[] = keys ? JSON.parse(keys) : [];
    return keysArr.some((keyId) => keyId === key) ? true : false;
  };

  add = (key: number) => {
    const keys = localStorage.getItem('viewsArr');
    const keysArr: number[] = keys ? JSON.parse(keys) : [];
    keysArr.push(key);
    localStorage.setItem('viewsArr', JSON.stringify(keysArr));
  };

  remove = (key: number) => {
    const keys = localStorage.getItem('viewsArr');
    const keysArr: number[] = keys ? JSON.parse(keys) : [];

    const arr = keysArr.filter((element) => element !== key);
    localStorage.setItem('viewsArr', JSON.stringify(arr));
  };
}
