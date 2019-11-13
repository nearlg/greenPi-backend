import { Repository } from "./repository";
import { SensorType } from "../../entities/sensor-type";

export interface SensorTypeRepository extends Repository<SensorType> {
  find(id: string): Promise<SensorType>;
  remove(id: string): Promise<SensorType>;
}
