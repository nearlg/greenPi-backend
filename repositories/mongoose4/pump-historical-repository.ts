import mongoose = require("mongoose");
import {
  rejectIfNull,
  normalizeData,
  getSearchingObject
} from "@/repositories/mongoose4/helpers";
import { PumpHistoricalRepository } from "@/repositories/interface/pump-historical-repository";
import { PumpHistorical } from "@/models/interface/pump-historical";
import { Pump } from "@/models/interface/pump";

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
  findLastsByPumpIds(pumpIds: string[]): Promise<PumpHistoricalModel[]> {
    // If it can not find a measure,
    // it will be undefined in the 'measures' array
    const pumpHistoricals = pumpIds.map(pumpId =>
      this.findLastByPumpId(pumpId).catch(error => undefined)
    );
    // Remove all the undefined elements from the array
    return Promise.all(pumpHistoricals).then(p =>
      p.filter(p => p != undefined)
    );
  }

  findLastByPumpId(pumpId: string): Promise<PumpHistoricalModel> {
    const searchingObject = { pump: pumpId };
    return PumpHistoricalModel.find(searchingObject)
      .sort({ date: -1 })
      .limit(1)
      .populate("pump")
      .then(rejectIfNull("Measure not found"))
      .then(normalizeData)
      .then(doc => doc[0]);
  }

  findAllByPumpIds(
    pumpIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<PumpHistorical[]> {
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["pump"] = { $in: pumpIds };
    return PumpHistoricalModel.find(searchingObject)
      .populate("pump")
      .sort(sortBy)
      .then(normalizeData);
  }

  findAllByPumps(
    pumps: Pump[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<PumpHistorical[]> {
    let pumpIds: string[] = pumps.map(pump => pump.id);
    return this.findAllByPumpIds(pumpIds, sortBy, gte, lte);
  }

  findAllByPumpId(
    pumpId: string,
    sortBy: string = "date",
    gte?: Date,
    lte?: Date
  ): Promise<null | PumpHistorical[]> {
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["pump"] = pumpId;
    return PumpHistoricalModel.find(searchingObject)
      .populate("pump")
      .sort(sortBy)
      .then(normalizeData);
  }

  findAllByPump(
    pump: Pump,
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | PumpHistorical[]> {
    return this.findAllByPumpId(pump.id, sortBy, gte, lte);
  }

  create(document: PumpHistorical): Promise<PumpHistorical> {
    return PumpHistoricalModel.create(document)
      .then(pumpHistorical =>
        PumpHistoricalModel.populate(pumpHistorical, {
          path: "pump"
        })
      )
      .then(rejectIfNull("Pump historical not found"))
      .then((o: PumpHistoricalModel) =>
        PumpHistoricalModel.populate(o, {
          path: "pump"
        })
      )
      .then(normalizeData);
  }

  update(document: PumpHistorical): Promise<PumpHistorical> {
    return PumpHistoricalModel.findByIdAndUpdate(document.id, document, {
      new: true
    })
      .populate("pump")
      .exec()
      .then(rejectIfNull("Pump historical not found"))
      .then(normalizeData);
  }

  remove(id: string): Promise<PumpHistorical> {
    return PumpHistoricalModel.findByIdAndRemove(id)
      .exec()
      .then(rejectIfNull("Pump historical not found"))
      .then(normalizeData);
  }

  findAll(): Promise<PumpHistorical[]> {
    return PumpHistoricalModel.find()
      .populate("pump")
      .exec()
      .then(normalizeData);
  }

  find(id: string): Promise<PumpHistorical> {
    return PumpHistoricalModel.findById(id)
      .populate("pump")
      .exec()
      .then(rejectIfNull("Pump historical not found"))
      .then(normalizeData);
  }
}
