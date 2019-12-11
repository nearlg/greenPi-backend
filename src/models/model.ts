import { AuthData } from '../interfaces/auth-data';
import { RoleName } from '../interfaces/entities/role-name';

export interface Model {
  rules: Map<string, Set<RoleName>>;
  authData: AuthData;
}
