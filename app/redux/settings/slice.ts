import { createSlice } from '@reduxjs/toolkit';
import { reduxSliceTypes } from '../../types/index';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SetLoadingActionType } from './reducer.type';

const initialState: reduxSliceTypes.SettingsSliceType = {
  loading: {
    isLoading: false,
    content: undefined,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<SetLoadingActionType>) => {
      state.loading.isLoading = action.payload.isLoading;
      state.loading.content = action.payload.content || state.loading.content;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export const selectLoading = (state: reduxSliceTypes.SettingsSliceType) => state.loading;

export default settingsSlice.reducer;
