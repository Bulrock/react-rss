import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;
import { ICharactersFetchState, ICharacter } from '../models/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

const initialState: ICharactersFetchState = {
  searchResults: [],
};

export const CharactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateSearchResults: (
      state,
      action: toolkitRaw.PayloadAction<FetchBaseQueryError | ICharacter[]>
    ) => {
      state.searchResults = action.payload;
    },
  },
});

export const { updateSearchResults } = CharactersSlice.actions;

export default CharactersSlice.reducer;
