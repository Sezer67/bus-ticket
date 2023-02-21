import { configureStore, combineReducers } from '@reduxjs/toolkit';
import settingsSlice from './settings/slice';
import userSlice from './user/slice';
import { ReduxRootType } from '../../types/redux-slice.type';

const reducer = {
  settings: settingsSlice,
  user: userSlice,
};
export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
