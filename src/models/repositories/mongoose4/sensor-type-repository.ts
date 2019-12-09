import mongoose = require('mongoose');
import { rejectIfNull, normalizeData, paginateQuery } from './helpers';
import { SensorTypeRepository } from '../interfaces/sensor-type-repository';
import { SensorType } from '../../entities/sensor-type';
import { PaginationRequest } from '../../../lib/pagination/request';

interface SensorTypeModel extends SensorType, mongoose.Document {}

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A sensor must have a name']
  },
  description: String,
  unit: {
    name: {
      type: String,
      required: [true, 'A sensor unit must have a name']
    },
    description: String
    //required: [true, 'A sensor must have the unit']
  }
});

const SensorTypeModel = mongoose.model<SensorTypeModel>(
  'SensorType',
  sensorSchema
);

const defaultPagination: PaginationRequest = {
  limit: 10
};

export class SensorTypeMongooseRepository implements SensorTypeRepository {
  async create(document: SensorType): Promise<SensorType> {
    const doc = await SensorTypeModel.create(document);
    return normalizeData(doc);
  }

  async update(document: SensorType): Promise<SensorType> {
    const doc = await SensorTypeModel.findByIdAndUpdate(document.id, document, {
      new: true
    }).exec();
    rejectIfNull('Sensor type not found', doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<SensorType> {
    const doc = await SensorTypeModel.findByIdAndRemove(id).exec();
    rejectIfNull('Sensor type not found', doc);
    return normalizeData(doc);
  }

  async findAll(pagination: PaginationRequest = defaultPagination) {
    const query = SensorTypeModel.find();
    const countQuery = SensorTypeModel.estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, pagination);
    return pagedData;
  }

  async find(id: string): Promise<SensorType> {
    const doc = await SensorTypeModel.findById(id).exec();
    rejectIfNull('Sensor type not found', doc);
    return normalizeData(doc);
  }
}
