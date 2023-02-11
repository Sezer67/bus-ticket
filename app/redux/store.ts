import { configureStore, combineReducers } from '@reduxjs/toolkit';
import settingsSlice from './settings/slice';

const reducer = {
  settings: settingsSlice,
};
export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
