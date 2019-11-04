import mongoose = require("mongoose");
import { rejectIfNull, normalizeData } from "./helpers";
import { SensorTypeRepository } from "../interface/sensor-type-repository";
import { SensorType } from "../../entities/sensor-type";

interface SensorTypeModel extends SensorType, mongoose.Document {}

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A sensor must have a name"]
  },
  description: String,
  unit: {
    name: {
      type: String,
      required: [true, "A sensor unit must have a name"]
    },
    description: String
    //required: [true, 'A sensor must have the unit']
  }
});

const SensorTypeModel = mongoose.model<SensorTypeModel>(
  "SensorType",
  sensorSchema
);

export class SensorTypeMongooseRepository implements SensorTypeRepository {
  async create(document: SensorType): Promise<SensorType> {
    const doc = await SensorTypeModel.create(document);
    return normalizeData(doc);
  }

  async update(document: SensorType): Promise<SensorType> {
    const doc = await SensorTypeModel.findByIdAndUpdate(document.id, document, {
      new: true
    }).exec();
    rejectIfNull("Sensor type not found", doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<SensorType> {
    const doc = await SensorTypeModel.findByIdAndRemove(id).exec();
    rejectIfNull("Sensor type not found", doc);
    return normalizeData(doc);
  }

  async findAll(): Promise<SensorType[]> {
    const docs = await SensorTypeModel.find().exec();
    return normalizeData(docs);
  }

  async find(id: string): Promise<SensorType> {
    const doc = await SensorTypeModel.findById(id).exec();
    rejectIfNull("Sensor type not found", doc);
    return normalizeData(doc);
  }
}
