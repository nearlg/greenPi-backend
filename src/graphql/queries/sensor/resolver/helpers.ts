import { SensorType } from "../../../../models/interface/sensor-type";
import { Sensor } from "../../../../models/interface/sensor";
import { sensorTypeRepository } from "../../../../repositories";

export async function validateDependencies(sensor: Sensor): Promise<Sensor> {
  const sensorTypeId: string =
    (<SensorType>sensor.type).name || <string>sensor.type;
  await sensorTypeRepository.find(sensorTypeId);
  return sensor;
}
