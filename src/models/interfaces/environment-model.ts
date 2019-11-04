import { Model } from "./model";
import { Environment } from "../entities/environment";
import { RoleName } from "../role-name";

export interface EnvironmentModel extends Model<Environment> {
  find(roleName: RoleName, id: string): Promise<Environment>;
  remove(roleName: RoleName, id: string): Promise<Environment>;
}
