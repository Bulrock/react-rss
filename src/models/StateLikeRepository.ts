import { updateLikeArr } from '../features/StateLikeRepositorySlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { IStateFunction } from './types';

export default function StateLikeRepository(action: string): IStateFunction {
  const likeArray = useAppSelector((state) => state.likeArray.value);
  const dispatch = useAppDispatch();

  if (action === 'find') {
    return function find(key: number | string): boolean {
      const isFind = likeArray.some((keyId) => keyId === key) ? true : false;
      return isFind;
    };
  } else if (action === 'add') {
    return function add(key: number | string) {
      const newLikeArr = [...likeArray, key];
      dispatch(updateLikeArr(newLikeArr));
    };
  } else {
    return function remove(key: number | string) {
      const arr = likeArray.filter((element) => element !== key);
      dispatch(updateLikeArr(arr));
    };
  }
}
