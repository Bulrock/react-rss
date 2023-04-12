import { configureStore } from '@reduxjs/toolkit';
import SearchBarReducer from '../features/SearchBarSlice';
import CharacterFormReducer from '../features/CharacterFormSlice';
import StateLikeRepositoryReducer from '../features/StateLikeRepositorySlice';
import StateViewRepositoryReducer from '../features/StateViewRepositorySlice';
import { charactersAPI } from '../features/ApiSlice';

const store = configureStore({
  reducer: {
    search: SearchBarReducer,
    formCharacters: CharacterFormReducer,
    likeArray: StateLikeRepositoryReducer,
    viewArray: StateViewRepositoryReducer,
    [charactersAPI.reducerPath]: charactersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersAPI.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
