import { createSlice } from '@reduxjs/toolkit';
import { reduxSliceTypes } from '../../../types/index';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SetErrorActionType, SetLoadingActionType } from './reducer.type';

const initialState: reduxSliceTypes.SettingsSliceType = {
  loading: {
    isLoading: false,
    content: undefined,
  },
  error: {
    isError: true,
    content: 'Error Snackbar',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<SetLoadingActionType>) => {
      state.loading.isLoading = action.payload.isLoading;
      state.loading.content = action.payload.content;
    },
    setErrorSnackbar: (state, action: PayloadAction<SetErrorActionType>) => {
      state.error.isError = action.payload.isError;
      state.error.content = action.payload.content;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export const selectLoading = (state: reduxSliceTypes.SettingsSliceType) => state.loading;

export default settingsSlice.reducer;
