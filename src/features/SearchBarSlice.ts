import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export const SearchBarSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
  },
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearch: updateSearch } = SearchBarSlice.actions;

export const searchValue = (state: RootState) => state.search;

export default SearchBarSlice.reducer;
