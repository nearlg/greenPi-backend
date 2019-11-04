import { Model } from "./model";
import { User } from "../entities/user";
import { RoleName } from "../role-name";

export interface UserModel extends Model<User> {
  find(roleName: RoleName, id: string): Promise<User>;
  findByEmail(roleName: RoleName, email: string): Promise<User>;
  getRoleName(roleName: RoleName, id: string): Promise<RoleName>;
  remove(roleName: RoleName, id: string): Promise<User>;
  findByGoogleId(roleName: RoleName, id: string): Promise<User>;
}
