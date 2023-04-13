import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchState } from '../models/types';

const initialState: ISearchState = {
  value: '',
};

export const SearchBarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearch } = SearchBarSlice.actions;

export default SearchBarSlice.reducer;
