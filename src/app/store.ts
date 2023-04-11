import { configureStore } from '@reduxjs/toolkit';
import SearchBarReducer from '../features/SearchBarSlice';
import CharacterFormReducer from '../features/CharacterFormSlice';
import StateLikeRepositoryReducer from '../features/StateLikeRepositorySlice';
import StateViewRepositoryReducer from '../features/StateViewRepositorySlice';

const store = configureStore({
  reducer: {
    search: SearchBarReducer,
    formCharacters: CharacterFormReducer,
    likeArray: StateLikeRepositoryReducer,
    viewArray: StateViewRepositoryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
