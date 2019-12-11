import mongoose = require('mongoose');
import { PumpHistorical } from '../../../../interfaces/entities/pump-historical';
import { PaginationRequest } from '../../../../lib/pagination/request';
import { PumpHistoricalRepository } from '../pump-historical';
import {
  normalizeData,
  getSearchingObject,
  paginateQuery,
  rejectIfNull
} from '../../../../helpers/model/repository/mongoose';
import { FindAllOptions } from '../../../measure/repository/find-all-options';

interface PumpHistoricalModel extends PumpHistorical, mongoose.Document {}

const pumpHistoricalSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: [true, 'A pump historical must have a date']
  },
  pump: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pump',
    required: [true, 'A pump historical must have a pump']
  },
  state: {
    type: Number,
    required: [true, 'A pump historical must have the state']
  }
});

const PumpHistoricalModel = mongoose.model<PumpHistoricalModel>(
  'PumpHistorical',
  pumpHistoricalSchema
);

const defaultPagination: PaginationRequest = {
  limit: 20
};

export class PumpHistoricalMongooseRepository
  implements PumpHistoricalRepository {
  async findLastsByPumpIds(
    pumpIds: string[],
    limit: number = 1
  ): Promise<PumpHistoricalModel[]> {
    // If it can not find a pumpHistorical,
    // it will be undefined in the 'pumpHistoricals' array
    const pumpHistoricalsPromises = pumpIds.map(pumpId =>
      this.findLastsByPumpId(pumpId, limit).catch(error => undefined)
    );
    // Remove all the undefined elements from the array
    const pumpHistoricals = await Promise.all(pumpHistoricalsPromises);
    return pumpHistoricals.filter(p => p != undefined);
  }

  async findLastsByPumpId(
    pumpId: string,
    limit: number = 1
  ): Promise<PumpHistoricalModel[]> {
    const searchingObject = { pump: pumpId };
    const doc = await PumpHistoricalModel.find(searchingObject)
      .sort({ date: -1 })
      .limit(limit);
    rejectIfNull('Pump not found', doc);
    return normalizeData(doc);
  }

  async findAllByPumpIds(pumpIds: string[], options: FindAllOptions = {}) {
    const paginationReq = options.paginationRequest;
    const filter = options.filter;
    const gte = filter && filter.gte ? filter.gte : null;
    const lte = filter && filter.lte ? filter.lte : null;
    const sortBy: string = filter && filter.sortBy ? filter.sortBy : null;
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject['pump'] = { $in: pumpIds };
    const query = PumpHistoricalModel.find(searchingObject).sort(sortBy);
    const countQuery = PumpHistoricalModel.find(
      searchingObject
    ).estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, paginationReq);
    return pagedData;
  }

  async create(document: PumpHistorical): Promise<PumpHistorical> {
    const doc = await PumpHistoricalModel.create(document);
    return normalizeData(doc);
  }

  async update(document: PumpHistorical): Promise<PumpHistorical> {
    const doc = await PumpHistoricalModel.findByIdAndUpdate(
      document.id,
      document,
      { new: true }
    ).exec();
    rejectIfNull('Pump historical not found', doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<PumpHistorical> {
    const doc = await PumpHistoricalModel.findByIdAndRemove(id).exec();
    rejectIfNull('Pump historical not found', doc);
    return normalizeData(doc);
  }

  async findAll(pagination: PaginationRequest = defaultPagination) {
    const query = PumpHistoricalModel.find().populate('pump');
    const countQuery = PumpHistoricalModel.estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, pagination);
    return pagedData;
  }

  async find(id: string): Promise<PumpHistorical> {
    const doc = await PumpHistoricalModel.findById(id)
      .populate('pump')
      .exec();
    rejectIfNull('Pump historical not found', doc);
    return normalizeData(doc);
  }
}
