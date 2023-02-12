export type UserType = {
  id: string;
  fullName: string;
  identityNumber: string;
  birthday?: Date;
  gender: Gender;
  mail: string;
};

type Gender = 'Male' | 'Female';
