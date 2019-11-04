import * as sensorTypeValidator from "../../../../validation/sensor-type";
import { SensorTypeResolver } from "./sensor-type-resolver";
import { sensorTypeRepository } from "../../../../models/repositories";

const resolver: SensorTypeResolver = {
  async addSensorType(args, req) {
    const unit = {
      name: args.sensorTypeData.unit.name
        ? args.sensorTypeData.unit.name
        : null,
      description: args.sensorTypeData.unit.description
        ? args.sensorTypeData.unit.description
        : null
    };
    const sensorTypeData = { ...args.sensorTypeData, unit };
    const doc = await sensorTypeValidator.validate(sensorTypeData, false);
    const sensorType = await sensorTypeRepository.create(doc);
    return sensorType;
  },
  async deleteSensorType(args, req) {
    const sensorType = await sensorTypeRepository.remove(args.id);
    return sensorType;
  },
  async fetchSensorTypes(args, req) {
    const sensorTypes = await sensorTypeRepository.findAll();
    return sensorTypes;
  },
  async getSensorType(args, req) {
    const sensorType = await sensorTypeRepository.find(args.id);
    return sensorType;
  },
  async updateSensorType(args, req) {
    const unit = {
      name: args.sensorTypeData.unit.name
        ? args.sensorTypeData.unit.name
        : null,
      description: args.sensorTypeData.unit.description
        ? args.sensorTypeData.unit.description
        : null
    };
    const sensorTypeData = { ...args.sensorTypeData, unit };
    const doc = await sensorTypeValidator.validate(sensorTypeData);
    const sensorType = await sensorTypeRepository.update(doc);
    return sensorType;
  }
};

export default resolver;
