import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharactersFetchState, ICharacter } from '../models/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

const initialState: ICharactersFetchState = {
  searchResults: [],
};

export const CharactersFetchSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
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

export const { updateSearchResults } = CharactersFetchSlice.actions;

export default CharactersFetchSlice.reducer;
