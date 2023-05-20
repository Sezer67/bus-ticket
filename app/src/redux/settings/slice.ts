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
    isError: false,
    isSuccess: false,
    content: undefined,
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
      if(action.payload.isError !== undefined){
        state.error.isError = action.payload.isError;
      }
      if(action.payload.isSuccess !== undefined){
        state.error.isSuccess = action.payload.isSuccess;
      }
      state.error.content = action.payload.content;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export const selectLoading = (state: reduxSliceTypes.SettingsSliceType) => state.loading;

export default settingsSlice.reducer;
