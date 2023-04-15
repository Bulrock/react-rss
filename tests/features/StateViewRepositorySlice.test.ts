import { IStateRepository } from '../../src/models/types';
import reducer, { updateViewArr } from '../../src/features/StateViewRepositorySlice';

describe('StateViewRepositorySlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ value: [] });
  });

  test('should handle a new view id value replace an empty value', () => {
    const previousState: IStateRepository = { value: [] };

    expect(reducer(previousState, updateViewArr(['1']))).toEqual({
      value: ['1'],
    });
  });

  test('should handle a new view id array value replaced an existing value', () => {
    const previousState: IStateRepository = { value: ['12'] };

    expect(reducer(previousState, updateViewArr(['12', '1']))).toEqual({
      value: ['12', '1'],
    });
  });
});
