import { User } from '../interfaces/entities/user';

export interface SignInResponse {
  token: string;
  profile: User;
}
