import { Measure } from '../../../../interfaces/entities/measure';
import { Sensor } from '../../../../interfaces/entities/sensor';
import { sensorRepository } from '../../../../models/sensor/repository';

export async function validateDependencies(measure: Measure): Promise<Measure> {
  const sensorId: string =
    (<Sensor>measure.sensor).id || <string>measure.sensor;
  await sensorRepository.find(sensorId);
  return measure;
}
