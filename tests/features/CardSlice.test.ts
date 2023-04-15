import { ICardState } from '../../src/models/types';
import reducer, { updateId } from '../../src/features/CardSlice';

describe('CardSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ id: '' });
  });

  test('should handle a new id replace an empty value', () => {
    const previousState: ICardState = { id: '' };

    expect(reducer(previousState, updateId('1010'))).toEqual({
      id: '1010',
    });
  });

  test('should handle a new id replaced an existing id', () => {
    const previousState: ICardState = { id: '1010' };

    expect(reducer(previousState, updateId('10'))).toEqual({
      id: '10',
    });
  });
});
