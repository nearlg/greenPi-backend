import { SensorResolver } from "./sensor-resolver";

const resolver: SensorResolver = {
  async addSensor(args, context) {
    const doc = await context.models.sensor.add(args.sensorData);
    return doc;
  },
  async deleteSensor(args, context) {
    const doc = context.models.sensor.delete(args.id);
    return doc;
  },
  async fetchSensors(args, context) {
    const doc = await context.models.sensor.fetchAll();
    return doc;
  },
  async getSensor(args, context) {
    const doc = await context.models.sensor.get(args.id);
    return doc;
  },
  async updateSensor(args, context) {
    const doc = await context.models.sensor.update(args.sensorData);
    return doc;
  }
};

export default resolver;
