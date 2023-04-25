import { updateViewArr } from '../features/StateViewRepositorySlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { IStateFunction } from './types';

export default function StateViewRepository(action: string): IStateFunction {
  const viewArray = useAppSelector((state) => state.viewArray.value);
  const dispatch = useAppDispatch();

  if (action === 'find') {
    return function find(key: number | string): boolean {
      const isFind = viewArray.some((keyId) => keyId === key) ? true : false;
      return isFind;
    };
  } else {
    return function add(key: number | string) {
      const newViewArr = [...viewArray, key];
      dispatch(updateViewArr(newViewArr));
    };
  }
}
