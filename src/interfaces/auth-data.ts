import { RoleName } from './entities/role-name';
import { User } from './entities/user';

export interface AuthData {
  roleName: RoleName;
  user?: User;
}
