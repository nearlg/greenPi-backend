import { Request } from "restify";
import { SensorType } from "../../../../models/entities/sensor-type";
import { AddSensorTypeArgs } from "./args/add-sensor-type-args";
import { UpdateSensorTypeArgs } from "./args/update-sensor-type-args";

export interface SensorTypeResolver {
  addSensorType(
    args: { sensorTypeData: AddSensorTypeArgs },
    req: Request
  ): Promise<SensorType>;
  updateSensorType(
    args: { sensorTypeData: UpdateSensorTypeArgs },
    req: Request
  ): Promise<SensorType>;
  deleteSensorType(args: { id: string }, req: Request): Promise<SensorType>;
  fetchSensorTypes(args: {}, req: Request): Promise<SensorType[]>;
  getSensorType(args: { id: string }, req: Request): Promise<SensorType>;
}
