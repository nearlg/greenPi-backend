import { Measure } from "../../../../models/interface/measure";
import { Sensor } from "../../../../models/interface/sensor";
import { sensorRepository } from "../../../../repositories";

export async function validateDependencies(measure: Measure): Promise<Measure> {
  const sensorId: string =
    (<Sensor>measure.sensor).id || <string>measure.sensor;
  await sensorRepository.find(sensorId);
  return measure;
}
