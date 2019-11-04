import mongoose = require("mongoose");
import { rejectIfNull, normalizeData, getSearchingObject } from "./helpers";
import { PumpHistoricalRepository } from "../interface/pump-historical-repository";
import { PumpHistorical } from "../../models/interface/pump-historical";
import { Pump } from "../../models/interface/pump";

interface PumpHistoricalModel extends PumpHistorical, mongoose.Document {}

const pumpHistoricalSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: [true, "A pump historical must have a date"]
  },
  pump: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pump",
    required: [true, "A pump historical must have a pump"]
  },
  state: {
    type: Number,
    required: [true, "A pump historical must have the state"]
  }
});

const PumpHistoricalModel = mongoose.model<PumpHistoricalModel>(
  "PumpHistorical",
  pumpHistoricalSchema
);

export class PumpHistoricalMongooseRepository
  implements PumpHistoricalRepository {
  async findLastsByPumpIds(pumpIds: string[]): Promise<PumpHistoricalModel[]> {
    // If it can not find a measure,
    // it will be undefined in the 'measures' array
    const pumpHistoricalsPromises = pumpIds.map(pumpId =>
      this.findLastByPumpId(pumpId).catch(error => undefined)
    );
    // Remove all the undefined elements from the array
    const pumpHistoricals = await Promise.all(pumpHistoricalsPromises);
    return pumpHistoricals.filter(p => p != undefined);
  }

  async findLastByPumpId(pumpId: string): Promise<PumpHistoricalModel> {
    const searchingObject = { pump: pumpId };
    const doc = await PumpHistoricalModel.find(searchingObject)
      .sort({ date: -1 })
      .limit(1)
      .populate("pump");
    rejectIfNull("Measure not found", doc);
    return normalizeData(doc[0]);
  }

  async findAllByPumpIds(
    pumpIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<PumpHistorical[]> {
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["pump"] = { $in: pumpIds };
    const doc = await PumpHistoricalModel.find(searchingObject)
      .populate("pump")
      .sort(sortBy);
    return normalizeData(doc);
  }

  async findAllByPumpId(
    pumpId: string,
    sortBy: string = "date",
    gte?: Date,
    lte?: Date
  ): Promise<null | PumpHistorical[]> {
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["pump"] = pumpId;
    const doc = await PumpHistoricalModel.find(searchingObject)
      .populate("pump")
      .sort(sortBy);
    return normalizeData(doc);
  }

  async create(document: PumpHistorical): Promise<PumpHistorical> {
    let doc = await PumpHistoricalModel.create(document);
    doc = await PumpHistoricalModel.populate(doc, {
      path: "pump"
    });
    doc = await PumpHistoricalModel.populate(doc, {
      path: "pump"
    });
    return normalizeData(doc);
  }

  async update(document: PumpHistorical): Promise<PumpHistorical> {
    const doc = await PumpHistoricalModel.findByIdAndUpdate(
      document.id,
      document,
      { new: true }
    )
      .populate("pump")
      .exec();
    rejectIfNull("Pump historical not found", doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<PumpHistorical> {
    const doc = await PumpHistoricalModel.findByIdAndRemove(id).exec();
    rejectIfNull("Pump historical not found", doc);
    return normalizeData(doc);
  }

  async findAll(): Promise<PumpHistorical[]> {
    const docs = await PumpHistoricalModel.find()
      .populate("pump")
      .exec();
    return normalizeData(docs);
  }

  async find(id: string): Promise<PumpHistorical> {
    const doc = await PumpHistoricalModel.findById(id)
      .populate("pump")
      .exec();
    rejectIfNull("Pump historical not found", doc);
    return normalizeData(doc);
  }
}
