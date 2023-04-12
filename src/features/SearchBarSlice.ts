import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchState, CharectersFetchResult } from '../models/types';

const initialState: ISearchState = {
  value: ' ',
  searchCharacters: undefined,
};

export const SearchBarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    updateSearchCharacters: (state, action: PayloadAction<CharectersFetchResult>) => {
      if (!action.payload || 'error' in action.payload) {
        state.searchCharacters = { error: 'There is nothing here' };
      } else {
        state.searchCharacters = action.payload;
      }
    },
  },
});

export const { updateSearch, updateSearchCharacters } = SearchBarSlice.actions;

export default SearchBarSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ISearchState, ResponseResult } from '../models/types';

// const initialState: ISearchState = {
//   value: ' ',
//   searchCharacters: undefined,
// };

// export const SearchBarSlice = createSlice({
//   name: 'search',
//   initialState,
//   reducers: {
//     updateSearch: (state, action: PayloadAction<string>) => {
//       state.value = action.payload;
//     },
//     updateSearchCharacters: (state, action: PayloadAction<ResponseResult>) => {
//       if (!action.payload || 'error' in action.payload) {
//         state.searchCharacters = { error: 'There is nothing here' };
//       } else if (!('info' in action.payload)) {
//         state.searchCharacters = action.payload;
//       } else {
//         state.searchCharacters = action.payload.results;
//       }
//     },
//   },
// });

// export const { updateSearch, updateSearchCharacters } = SearchBarSlice.actions;

// export default SearchBarSlice.reducer;
