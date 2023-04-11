import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateRepository } from '../models/types';

const initialState: IStateRepository = {
  value: [],
};

export const LikeRepositorySlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    updateLikeArr: (state, action: PayloadAction<(string | number)[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateLikeArr } = LikeRepositorySlice.actions;

export default LikeRepositorySlice.reducer;
