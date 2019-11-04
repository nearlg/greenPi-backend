import mongoose = require("mongoose");
import { rejectIfNull, normalizeData, getSearchingObject } from "./helpers";
import { MeasureRepository } from "../interface/measure-repository";
import { Measure } from "../../entities/measure";
import { Sensor } from "../../entities/sensor";

interface MeasureModel extends Measure, mongoose.Document {}

const measureSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: [true, "A measure must have a date"]
  },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sensor",
    required: [true, "A measure must have a sensor"]
  },
  value: {
    type: Number,
    required: [true, "A measure must have a value"]
  }
});

const MeasureModel = mongoose.model<MeasureModel>("Measure", measureSchema);

export class MeasureMongooseRepository implements MeasureRepository {
  async findLastsBySensorIds(sensorIds: string[]): Promise<Measure[]> {
    // If it can not find a measure,
    // it will be undefined in the 'measures' array
    const measuresPromises = sensorIds.map(sensorId =>
      this.findLastBySensorId(sensorId).catch(error => undefined)
    );
    // Remove all the undefined elements from the array
    const measures = await Promise.all(measuresPromises);
    return measures.filter(m => m != undefined);
  }

  async findLastBySensorId(sensorId: string): Promise<Measure> {
    const searchingObject = { sensor: sensorId };
    const docs = await MeasureModel.find(searchingObject)
      .sort({ date: -1 })
      .limit(1)
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      });
    rejectIfNull("Sensor not found", docs);
    return normalizeData(docs[0]);
  }

  async findAllByTypeIds(
    sensorTypeIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<Measure[]> {
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["sensor.type"] = { $in: sensorTypeIds };
    const docs = await MeasureModel.find(searchingObject)
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      })
      .sort(sortBy);
    return normalizeData(docs);
  }

  async findAllByTypeId(
    sensorTypeId: string,
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<Measure[]> {
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["sensor.type"] = sensorTypeId;
    const docs = await MeasureModel.find(searchingObject)
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      })
      .sort(sortBy);
    return normalizeData(docs);
  }

  async findAllBySensorIds(
    sensorIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<Measure[]> {
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["sensor"] = { $in: sensorIds };
    const docs = await MeasureModel.find(searchingObject)
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      })
      .sort(sortBy);
    return normalizeData(docs);
  }

  async findAllBySensorId(
    sensorId: string,
    sortBy: string = "date",
    gte: Date,
    lte: Date
  ): Promise<null | Measure[]> {
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["sensor"] = sensorId;
    const docs = await MeasureModel.find(searchingObject)
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      })
      .sort(sortBy);
    return normalizeData(docs);
  }

  async create(document: Measure): Promise<Measure> {
    let doc = await MeasureModel.create(document);
    doc = await MeasureModel.populate(doc, {
      path: "sensor",
      populate: {
        path: "type"
      }
    });
    doc = await MeasureModel.populate(doc, {
      path: "sensor",
      populate: {
        path: "type"
      }
    });
    return normalizeData(doc);
  }

  async update(document: Measure): Promise<Measure> {
    const doc = await MeasureModel.findByIdAndUpdate(document.id, document, {
      new: true
    })
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      })
      .exec();
    rejectIfNull("Measure not found", doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<Measure> {
    const doc = await MeasureModel.findByIdAndRemove(id).exec();
    rejectIfNull("Measure not found", doc);
    return normalizeData(doc);
  }

  async findAll(): Promise<Measure[]> {
    const docs = await MeasureModel.find()
      .sort({ date: 1 })
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      })
      .exec();
    return normalizeData(docs);
  }

  async findAllDistinct(): Promise<Measure[]> {
    const docs = await MeasureModel.find()
      .sort({ date: -1 })
      .distinct("sensor")
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      })
      .exec();
    return normalizeData(docs);
  }

  async find(id: string): Promise<Measure> {
    const doc = await MeasureModel.findById(id)
      .populate({
        path: "sensor",
        populate: {
          path: "type"
        }
      })
      .exec();
    rejectIfNull("Measure not found", doc);
    return normalizeData(doc);
  }
}
