import { Model } from "./model";
import { Pump } from "../entities/pump";
import { RoleName } from "../role-name";

export interface PumpRepository extends Model<Pump> {
  find(roleName: RoleName, id: string): Promise<Pump>;
  remove(roleName: RoleName, id: string): Promise<Pump>;
}
