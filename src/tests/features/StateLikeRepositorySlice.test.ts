import { IStateRepository } from '../../models/types';
import reducer, { updateLikeArr } from '../../features/StateLikeRepositorySlice';

describe('StateLikeRepositorySlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ value: [] });
  });

  test('should handle a new like id value replace an empty value', () => {
    const previousState: IStateRepository = { value: [] };

    expect(reducer(previousState, updateLikeArr(['1']))).toEqual({
      value: ['1'],
    });
  });

  test('should handle a new like id array value replaced an existing value', () => {
    const previousState: IStateRepository = { value: ['12'] };

    expect(reducer(previousState, updateLikeArr(['12', '1']))).toEqual({
      value: ['12', '1'],
    });
  });
});
