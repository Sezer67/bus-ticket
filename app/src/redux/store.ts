import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './settings/slice';
import userSlice from './user/slice';
import vehicleSlice from './vehicle/slice';
import serviceSlice from './service/slice';

const reducer = {
  settings: settingsSlice,
  user: userSlice,
  vehicle: vehicleSlice,
  service: serviceSlice,
};
export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
