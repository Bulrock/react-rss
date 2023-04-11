import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter, ICharacterFormState } from '../models/types';

const initialState: ICharacterFormState = {
  value: [],
};

export const CharacterFormSlice = createSlice({
  name: 'charcterForm',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<ICharacter>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addCharacter } = CharacterFormSlice.actions;

export default CharacterFormSlice.reducer;
