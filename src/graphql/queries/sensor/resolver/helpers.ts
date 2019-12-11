import { Sensor } from '../../../../interfaces/entities/sensor';
import { SensorType } from '../../../../interfaces/entities/sensor-type';
import { sensorTypeRepository } from '../../../../models/sensor-type/repository';

export async function validateDependencies(sensor: Sensor): Promise<Sensor> {
  const sensorTypeId: string =
    (<SensorType>sensor.type).name || <string>sensor.type;
  await sensorTypeRepository.find(sensorTypeId);
  return sensor;
}
