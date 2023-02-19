import { userEnums } from '../enums';

export type UserType = {
  id: string;
  fullName: string;
  identityNumber?: string;
  gender: userEnums.Gender;
  role: userEnums.Role;
  mail: string;
  birthday?: Date;
  companyId?: string;
};
