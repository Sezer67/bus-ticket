import { IndexPath } from '@ui-kitten/components';
import { UserType } from './user.type';

export type InputHookType = {
  value: string;
  onChangeText: (value: string) => void;
  isFocus: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

export type InputPasswordHookType = InputHookType & {
  secureTextEntry: boolean;
  setSecureTextEntry: (value: boolean) => void;
};

export type RadioGroupHookType = {
  selectedIndex: number;
  onChange: (value: number) => void;
};

export type SelectInputState = {
  selectedIndex: IndexPath | IndexPath[];
  onSelect: (index: IndexPath | IndexPath[]) => void;
};

export type DatePickerHookType = {
  open: boolean;
  date: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  onOpen: () => void;
};

export type UserDetailFormType = Omit<UserType, 'id'> & {
  password?: string;
};

export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
};
