import { RoleName } from '../../../../../interfaces/entities/role-name';

export interface UpdateUserArgs {
  id: string;
  name: string;
  email: string;
  password?: string;
  roleName: RoleName;
}
