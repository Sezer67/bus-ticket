import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { reduxSliceTypes } from '../../../types/index';
import { userEnums } from '../../../enums';
import { UserSliceType } from '../../../types/redux-slice.type';
import { UserType } from '../../../types/user.type';
import { LoginActionType } from './recuder.type';

const initialState: reduxSliceTypes.UserSliceType = {
  user: {
    id: '',
    fullName: '',
    gender: userEnums.Gender.Male,
    mail: '',
    role: userEnums.Role.Customer,
    birthday: undefined,
    companyId: undefined,
    identityNumber: undefined,
  },
  isAuthenticated: false,
  token: undefined,
  notReadComplainsCount: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = { ...action.payload };
    },
    login: (state, action: PayloadAction<LoginActionType>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.token = undefined;
      state.user = {
        id: '',
        fullName: '',
        gender: userEnums.Gender.Male,
        mail: '',
        role: userEnums.Role.Customer,
        birthday: undefined,
        companyId: undefined,
        identityNumber: undefined,
      };
    },
    setNotReadComplainsCount: (state, action: PayloadAction<{count: number}>) => {
      state.notReadComplainsCount = action.payload.count;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
