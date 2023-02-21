import { UserType } from './user.type';

export type SettingsSliceType = {
  loading: {
    isLoading: boolean;
    content: string | undefined;
  };
  error: {
    isError: boolean;
    content: string | undefined;
  };
};

export type UserSliceType = {
  user: UserType;
  token?: string;
  isAuthenticated: boolean;
};


export type ReduxRootType = {
  user: UserSliceType;
  settings: SettingsSliceType;
};