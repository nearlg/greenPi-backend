import { Request } from "restify";
import { Sensor } from "../../../../models/entities/sensor";
import { AddSensorArgs } from "./args/add-sensor-args";
import { UpdateSensorArgs } from "./args/update-sensor-args";

export interface SensorResolver {
  addSensor(args: { sensorData: AddSensorArgs }, req: Request): Promise<Sensor>;
  updateSensor(
    args: { sensorData: UpdateSensorArgs },
    req: Request
  ): Promise<Sensor>;
  deleteSensor(args: { id: string }, req: Request): Promise<Sensor>;
  fetchSensors(args: {}, req: Request): Promise<Sensor[]>;
  getSensor(args: { id: string }, req: Request): Promise<Sensor>;
}
