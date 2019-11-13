import mongoose = require("mongoose");
import {
  rejectIfNull,
  normalizeData,
  getSearchingObject,
  paginateQuery
} from "./helpers";
import {
  PumpHistoricalRepository,
  FindAllFilter
} from "../interfaces/pump-historical-repository";
import { PumpHistorical } from "../../entities/pump-historical";
import { PaginationRequest } from "../../../lib/pagination/request";

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

const defaultPagination: PaginationRequest = {
  limit: 20
};

export class PumpHistoricalMongooseRepository
  implements PumpHistoricalRepository {
  async findLastsByPumpIds(pumpIds: string[]): Promise<PumpHistoricalModel[]> {
    // If it can not find a pumpHistorical,
    // it will be undefined in the 'pumpHistoricals' array
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
    rejectIfNull("Pump not found", doc);
    return normalizeData(doc[0]);
  }

  async findAllByPumpIds(
    pumpIds: string[],
    pagination: PaginationRequest = defaultPagination,
    filter?: FindAllFilter
  ) {
    const gte = filter && filter.gte ? new Date(filter.gte) : null;
    const lte = filter && filter.lte ? new Date(filter.lte) : null;
    const sortBy: string = filter ? filter.sortBy : null;
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["pump"] = { $in: pumpIds };
    const query = PumpHistoricalModel.find(searchingObject)
      .populate("pump")
      .sort(sortBy);
    const countQuery = PumpHistoricalModel.find(
      searchingObject
    ).estimatedDocumentCount();
    const paginatedData = await paginateQuery(query, countQuery, pagination);
    return paginatedData;
  }

  async findAllByPumpId(
    pumpId: string,
    pagination: PaginationRequest = defaultPagination,
    filter?: FindAllFilter
  ) {
    const gte = filter && filter.gte ? new Date(filter.gte) : null;
    const lte = filter && filter.lte ? new Date(filter.lte) : null;
    const sortBy: string = filter ? filter.sortBy : "date";
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject["pump"] = pumpId;
    const query = PumpHistoricalModel.find(searchingObject)
      .populate("pump")
      .sort(sortBy);
    const countQuery = PumpHistoricalModel.find(
      searchingObject
    ).estimatedDocumentCount();
    const paginatedData = await paginateQuery(query, countQuery, pagination);
    return paginatedData;
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

  async findAll(pagination: PaginationRequest = defaultPagination) {
    const query = PumpHistoricalModel.find().populate("pump");
    const countQuery = PumpHistoricalModel.estimatedDocumentCount();
    const paginatedData = await paginateQuery(query, countQuery, pagination);
    return paginatedData;
  }

  async find(id: string): Promise<PumpHistorical> {
    const doc = await PumpHistoricalModel.findById(id)
      .populate("pump")
      .exec();
    rejectIfNull("Pump historical not found", doc);
    return normalizeData(doc);
  }
}
