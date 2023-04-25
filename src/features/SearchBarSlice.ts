import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;
import { ISearchState } from '../models/types';

const initialState: ISearchState = {
  value: '',
};

export const SearchBarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action: toolkitRaw.PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearch } = SearchBarSlice.actions;

export default SearchBarSlice.reducer;
