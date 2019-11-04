import { Model } from "./model";
import { Sensor } from "../entities/sensor";
import { RoleName } from "../role-name";

export interface SensorModel extends Model<Sensor> {
  find(roleName: RoleName, id: string): Promise<Sensor>;
  remove(roleName: RoleName, id: string): Promise<Sensor>;
}
