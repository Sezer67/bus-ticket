import { configureStore, combineReducers } from '@reduxjs/toolkit';
import settingsSlice from './settings/slice';
import userSlice from './user/slice';

const reducer = {
  settings: settingsSlice,
  user: userSlice,
};
export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
