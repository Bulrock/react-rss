import { configureStore } from '@reduxjs/toolkit';
import SearchBarReducer from '../features/SearchBarSlice';
import CharacterFormReducer from '../features/CharacterFormSlice';

const store = configureStore({
  reducer: {
    search: SearchBarReducer,
    formCharacters: CharacterFormReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
