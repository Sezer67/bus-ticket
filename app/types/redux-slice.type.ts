import { UserType } from './user.type';

export type SettingsSliceType = {
  loading: {
    isLoading: boolean;
    content: string | undefined;
  };
};

export type UserSliceType = {
  user: UserType;
  token?: string;
  isAuthenticated: boolean;
};
