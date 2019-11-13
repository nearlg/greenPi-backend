import { SensorTypeResolver } from "./sensor-type-resolver";

const resolver: SensorTypeResolver = {
  async addSensorType(args, context) {
    const doc = context.models.sensorType.add(args.sensorTypeData);
    return doc;
  },
  async deleteSensorType(args, context) {
    const doc = await context.models.sensorType.delete(args.id);
    return doc;
  },
  async fetchSensorTypes(args, context) {
    const docs = await context.models.sensorType.fetchAll(args.pagination);
    return docs;
  },
  async getSensorType(args, context) {
    const doc = await context.models.sensorType.get(args.id);
    return doc;
  },
  async updateSensorType(args, context) {
    const doc = await context.models.sensorType.update(args.sensorTypeData);
    return doc;
  }
};

export default resolver;
