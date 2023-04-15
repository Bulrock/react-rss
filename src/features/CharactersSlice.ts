import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharactersFetchState, ICharacter } from '../models/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

const initialState: ICharactersFetchState = {
  searchResults: [],
};

export const CharactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateSearchResults: (state, action: PayloadAction<FetchBaseQueryError | ICharacter[]>) => {
      state.searchResults = action.payload;
    },
  },
});

export const { updateSearchResults } = CharactersSlice.actions;

export default CharactersSlice.reducer;
