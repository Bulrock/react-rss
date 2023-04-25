import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;
import { ICardState } from '../models/types';

const initialState: ICardState = {
  id: '',
};

export const CardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    updateId: (state, action: toolkitRaw.PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { updateId } = CardSlice.actions;

export default CardSlice.reducer;
