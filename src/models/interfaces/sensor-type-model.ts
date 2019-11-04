import { Model } from "./model";
import { SensorType } from "../entities/sensor-type";
import { RoleName } from "../role-name";

export interface SensorTypeModel extends Model<SensorType> {
  find(roleName: RoleName, id: string): Promise<SensorType>;
  remove(roleName: RoleName, id: string): Promise<SensorType>;
}
