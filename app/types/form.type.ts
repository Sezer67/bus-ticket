import { UserType } from './user.type';

export type InputHookType = {
  value: string;
  onChangeText: (value: string) => void;
};

export type UserDetailFormType = Omit<UserType, 'id'> & {
  password?: string;
};

export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
};
