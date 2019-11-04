import { Repository } from "./repository";
import { Sensor } from "../../entities/sensor";

export interface SensorRepository extends Repository<Sensor> {
  find(id: string): Promise<Sensor>;
  remove(id: string): Promise<Sensor>;
}
