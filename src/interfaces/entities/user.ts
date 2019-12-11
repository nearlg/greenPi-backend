import { RoleName } from './role-name';

export interface User {
  id?: any;
  name: string;
  email: string;
  roleName: RoleName;
  password?: string;
  facebookId?: string;
  googleId?: string;
}
