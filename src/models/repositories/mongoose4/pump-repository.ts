import mongoose = require("mongoose");
import { rejectIfNull, normalizeData } from "./helpers";
import { PumpRepository } from "../interface/pump-repository";
import { Pump } from "../../entities/pump";

interface PumpModel extends Pump, mongoose.Document {}

const pumpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A pump must have a name"]
  },
  description: String,
  connectionPorts: [Number]
});

const PumpModel = mongoose.model<PumpModel>("Pump", pumpSchema);

export class PumpMongooseRepository implements PumpRepository {
  async create(document: Pump): Promise<Pump> {
    const doc = await PumpModel.create(document);
    return normalizeData(doc);
  }

  async update(document: Pump): Promise<Pump> {
    const doc = await PumpModel.findByIdAndUpdate(document.id, document, {
      new: true
    }).exec();
    rejectIfNull("Pump not found", doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<Pump> {
    const doc = await PumpModel.findByIdAndRemove(id).exec();
    rejectIfNull("Pump not found", doc);
    return normalizeData(doc);
  }

  async findAll(): Promise<Pump[]> {
    const docs = await PumpModel.find().exec();
    return normalizeData(docs);
  }

  async find(id: string): Promise<Pump> {
    const doc = await PumpModel.findById(id).exec();
    rejectIfNull("Pump not found", doc);
    return normalizeData(doc);
  }
}
