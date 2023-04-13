import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchState, ICharacter } from '../models/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

const initialState: ISearchState = {
  value: '',
  searchResults: [],
};

export const SearchBarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    updateSearchResults: (state, action: PayloadAction<FetchBaseQueryError | ICharacter[]>) => {
      state.searchResults = action.payload;

      // if (!action.payload || 'error' in action.payload) {
      //   state.searchCharacters = undefined;
      //   state.searchCharacters = { error: 'There is nothing here' };
      // } else if (!('info' in action.payload)) {
      //   state.searchCharacters = action.payload;
      // } else {
      //   state.searchCharacters = action.payload.results;
      // }
    },
  },
});

export const { updateSearch, updateSearchResults } = SearchBarSlice.actions;

export default SearchBarSlice.reducer;
