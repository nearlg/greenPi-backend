import mongoose = require('mongoose');
import { Pump } from '../../../../interfaces/entities/pump';
import { PaginationRequest } from '../../../../lib/pagination/request';
import { PumpRepository } from '../pump-repository';
import {
  normalizeData,
  paginateQuery,
  rejectIfNull
} from '../../../../helpers/model/repository/mongoose';

interface PumpModel extends Pump, mongoose.Document {}

const pumpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A pump must have a name']
  },
  description: String,
  connectionPorts: [Number]
});

const PumpModel = mongoose.model<PumpModel>('Pump', pumpSchema);

const defaultPagination: PaginationRequest = {
  limit: 10
};

// export class PumpMongooseRepository implements PumpRepository {
export class PumpMongooseRepository implements PumpRepository {
  async create(document: Pump): Promise<Pump> {
    const doc = await PumpModel.create(document);
    return normalizeData(doc);
  }

  async update(document: Pump): Promise<Pump> {
    const doc = await PumpModel.findByIdAndUpdate(document.id, document, {
      new: true
    }).exec();
    rejectIfNull('Pump not found', doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<Pump> {
    const doc = await PumpModel.findByIdAndRemove(id).exec();
    rejectIfNull('Pump not found', doc);
    return normalizeData(doc);
  }

  async findAll(pagination: PaginationRequest = defaultPagination) {
    const query = PumpModel.find();
    const countQuery = PumpModel.estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, pagination);
    return pagedData;
  }

  async find(id: string): Promise<Pump> {
    const doc = await PumpModel.findById(id).exec();
    rejectIfNull('Pump not found', doc);
    return normalizeData(doc);
  }
}
