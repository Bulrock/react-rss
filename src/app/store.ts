import { configureStore } from '@reduxjs/toolkit';
import SearchBarReducer from '../features/SearchBarSlice';

const store = configureStore({
  reducer: {
    search: SearchBarReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
