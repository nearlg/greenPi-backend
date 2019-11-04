import * as sensorValidator from "../../../../validation/sensor";
import { SensorResolver } from "./sensor-resolver";
import { sensorRepository } from "../../../../models/repositories";
import { validateDependencies } from "./helpers";

const resolver: SensorResolver = {
  async addSensor(args, req) {
    const doc = await sensorValidator.validate(args.sensorData, false);
    await validateDependencies(doc);
    const sensor = await sensorRepository.create(doc);
    return sensor;
  },
  async deleteSensor(args, req) {
    const sensor = sensorRepository.remove(args.id);
    return sensor;
  },
  async fetchSensors(args, req) {
    const sensors = await sensorRepository.findAll();
    return sensors;
  },
  async getSensor(args, req) {
    const sensor = await sensorRepository.find(args.id);
    return sensor;
  },
  async updateSensor(args, req) {
    const doc = await sensorValidator.validate(args.sensorData);
    await validateDependencies(doc);
    const sensor = await sensorRepository.update(doc);
    return sensor;
  }
};

export default resolver;
