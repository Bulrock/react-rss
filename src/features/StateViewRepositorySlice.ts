import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateRepository } from '../models/types';

const initialState: IStateRepository = {
  value: [],
};

export const ViewRepositorySlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    updateViewArr: (state, action: PayloadAction<(string | number)[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateViewArr } = ViewRepositorySlice.actions;

export default ViewRepositorySlice.reducer;
