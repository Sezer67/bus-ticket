import { UserSliceType } from '../../../types/redux-slice.type';
import { UserType } from '../../../types/user.type';

export type LoginActionType = {
  user: UserType;
  token: string;
};
