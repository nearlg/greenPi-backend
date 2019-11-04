import { RoleName } from "../role-name";

export interface Model<T> {
  findAll(roleName: RoleName): Promise<T[]>;
  create(roleName: RoleName, document: T): Promise<T>;
  update(roleName: RoleName, document: T): Promise<T>;
}
