import { SensorType } from "../../../../models/entities/sensor-type";
import { AddSensorTypeArgs } from "./args/add-sensor-type-args";
import { UpdateSensorTypeArgs } from "./args/update-sensor-type-args";
import { GraphqlContext } from "../../../graphql-context";

export interface SensorTypeResolver {
  addSensorType(
    args: { sensorTypeData: AddSensorTypeArgs },
    context: GraphqlContext
  ): Promise<SensorType>;
  updateSensorType(
    args: { sensorTypeData: UpdateSensorTypeArgs },
    context: GraphqlContext
  ): Promise<SensorType>;
  deleteSensorType(
    args: { id: string },
    context: GraphqlContext
  ): Promise<SensorType>;
  fetchSensorTypes(args: {}, context: GraphqlContext): Promise<SensorType[]>;
  getSensorType(
    args: { id: string },
    context: GraphqlContext
  ): Promise<SensorType>;
}
