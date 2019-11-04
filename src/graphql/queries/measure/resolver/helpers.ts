import { Measure } from "../../../../models/entities/measure";
import { Sensor } from "../../../../models/entities/sensor";
import { sensorRepository } from "../../../../models/repositories";

export async function validateDependencies(measure: Measure): Promise<Measure> {
  const sensorId: string =
    (<Sensor>measure.sensor).id || <string>measure.sensor;
  await sensorRepository.find(sensorId);
  return measure;
}
