import { RoleName } from "../../../../../services/authz.service/role-name";

export interface UpdateUserArgs {
  id: string;
  name: string;
  email: string;
  password?: string;
  roleName: RoleName;
}
