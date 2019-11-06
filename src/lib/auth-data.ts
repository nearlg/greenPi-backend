import { User } from "../models/entities/user";
import { RoleName } from "../models/role-name";

export interface AuthData {
  roleName: RoleName;
  user?: User;
}
