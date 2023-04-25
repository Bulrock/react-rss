import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { combineReducers, configureStore } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;
import SearchBarReducer from '../features/SearchBarSlice';
import CharacterFormReducer from '../features/CharacterFormSlice';
import StateLikeRepositoryReducer from '../features/StateLikeRepositorySlice';
import StateViewRepositoryReducer from '../features/StateViewRepositorySlice';
import CharactersFetchReducer from '../features/CharactersSlice';
import CardReducer from '../features/CardSlice';
import { charactersAPI } from '../features/ApiSlice';

const rootReducer = combineReducers({
  search: SearchBarReducer,
  card: CardReducer,
  characters: CharactersFetchReducer,
  formCharacters: CharacterFormReducer,
  likeArray: StateLikeRepositoryReducer,
  viewArray: StateViewRepositoryReducer,
  [charactersAPI.reducerPath]: charactersAPI.reducer,
});

export const storeSetup = (
  preloadedState?: toolkitRaw.PreloadedState<ReturnType<typeof rootReducer>>
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof storeSetup>;
export type AppDispatch = AppStore['dispatch'];
