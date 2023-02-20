import { userEnums } from '../../enums';
import { UserType } from '../../types/user.type';

export type LoginFormDataType = {
  mail: string;
  password: string;
};

export type LoginResponseType = {
  user: UserType;
  token: string;
};

export type RegisterFormDataType = {
  fullName: string;
  mail: string;
  identityNumber?: string;
  gender: userEnums.Gender;
  birthday: Date;
  password: string;
};
