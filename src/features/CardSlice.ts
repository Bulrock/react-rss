import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardState } from '../models/types';

const initialState: ICardState = {
  id: '',
};

export const CardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    updateId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { updateId } = CardSlice.actions;

export default CardSlice.reducer;
