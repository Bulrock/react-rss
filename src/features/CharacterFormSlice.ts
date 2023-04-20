import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;
import { ICharacter, ICharacterFormState } from '../models/types';

const initialState: ICharacterFormState = {
  value: [],
};

export const CharacterFormSlice = createSlice({
  name: 'charcterForm',
  initialState,
  reducers: {
    addCharacter: (state, action: toolkitRaw.PayloadAction<ICharacter>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addCharacter } = CharacterFormSlice.actions;

export default CharacterFormSlice.reducer;
