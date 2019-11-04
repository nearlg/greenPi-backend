import { SensorType } from "../../../../models/entities/sensor-type";
import { Sensor } from "../../../../models/entities/sensor";
import { sensorTypeRepository } from "../../../../models/repositories";

export async function validateDependencies(sensor: Sensor): Promise<Sensor> {
  const sensorTypeId: string =
    (<SensorType>sensor.type).name || <string>sensor.type;
  await sensorTypeRepository.find(sensorTypeId);
  return sensor;
}
