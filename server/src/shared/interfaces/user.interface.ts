import { User } from 'src/user/user.entity';

export interface ILoginResponse {
  user: User;
  token: string;
}
