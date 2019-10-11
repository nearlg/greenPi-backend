import mongoose = require("mongoose");
import { rejectIfNull, normalizeData } from "./helpers";
import { SensorRepository } from "../interface/sensor-repository";
import { Sensor } from "../../models/interface/sensor";

interface SensorModel extends Sensor, mongoose.Document {}

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A sensor must have a name"]
  },
  description: String,
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SensorType",
    required: [true, "A sensor must have a sensor type"]
  },
  connectionPorts: [Number]
});

const SensorModel = mongoose.model<SensorModel>("Sensor", sensorSchema);

export class SensorMongooseRepository implements SensorRepository {
  async create(document: Sensor): Promise<Sensor> {
    let doc = await SensorModel.create(document);
    doc = await SensorModel.populate(doc, {
      path: "type"
    });
    return normalizeData(doc);
  }

  async update(document: Sensor): Promise<Sensor> {
    const doc = await SensorModel.findByIdAndUpdate(document.id, document, {
      new: true
    }).exec();
    rejectIfNull("Sensor not found", doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<Sensor> {
    const doc = await SensorModel.findByIdAndRemove(id).exec();
    rejectIfNull("Sensor not found", doc);
    return normalizeData(doc);
  }

  async findAll(): Promise<Sensor[]> {
    const docs = await SensorModel.find()
      .populate("type")
      .exec();
    return normalizeData(docs);
  }

  async find(id: string): Promise<Sensor> {
    const doc = await SensorModel.findById(id).populate("type");
    rejectIfNull("Sensor not found", doc);
    return normalizeData(doc);
  }
}
