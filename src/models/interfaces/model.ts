import { RoleName } from "../role-name";

export interface Model<T> {
  rules: Map<string, Set<string>>;
  findAll(roleName: RoleName): Promise<T[]>;
  create(roleName: RoleName, document: T): Promise<T>;
  update(roleName: RoleName, document: T): Promise<T>;
}
