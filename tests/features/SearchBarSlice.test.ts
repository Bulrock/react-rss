import { ISearchState } from '../../src/models/types';
import reducer, { updateSearch } from '../../src/features/SearchBarSlice';

describe('SearchBarSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ value: '' });
  });

  test('should handle a new search value replace an empty value', () => {
    const previousState: ISearchState = { value: '' };

    expect(reducer(previousState, updateSearch('Rick'))).toEqual({
      value: 'Rick',
    });
  });

  test('should handle a new search value replaced an existing value', () => {
    const previousState: ISearchState = { value: 'Morty' };

    expect(reducer(previousState, updateSearch('Q'))).toEqual({
      value: 'Q',
    });
  });
});
