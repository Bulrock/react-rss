import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;
import { IStateRepository } from '../models/types';

const initialState: IStateRepository = {
  value: [],
};

export const ViewRepositorySlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    updateViewArr: (state, action: toolkitRaw.PayloadAction<(string | number)[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateViewArr } = ViewRepositorySlice.actions;

export default ViewRepositorySlice.reducer;
