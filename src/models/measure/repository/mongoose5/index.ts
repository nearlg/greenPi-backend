import mongoose = require('mongoose');
import { Measure } from '../../../../interfaces/entities/measure';
import { PaginationRequest } from '../../../../lib/pagination/request';
import { MeasureRepository } from '../measure';
import {
  normalizeData,
  getSearchingObject,
  paginateQuery,
  rejectIfNull
} from '../../../../helpers/model/repository/mongoose';
import { FindAllOptions } from '../../../pump-historical/repository/find-all-options';

interface MeasureModel extends Measure, mongoose.Document {}

const measureSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: [true, 'A measure must have a date']
  },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor',
    required: [true, 'A measure must have a sensor']
  },
  value: {
    type: Number,
    required: [true, 'A measure must have a value']
  }
});

const MeasureModel = mongoose.model<MeasureModel>('Measure', measureSchema);

const defaultPagination: PaginationRequest = {
  limit: 20
};

export class MeasureMongooseRepository implements MeasureRepository {
  async findLastsBySensorIds(
    sensorIds: string[],
    limit: number = 1
  ): Promise<Measure[]> {
    // If it can not find a measure,
    // it will be undefined in the 'measures' array
    const measuresPromises = sensorIds.map(sensorId =>
      this.findLastsBySensorId(sensorId, limit).catch(error => undefined)
    );
    // Remove all the undefined elements from the array
    const measures = await Promise.all(measuresPromises);
    return measures.filter(m => m != undefined);
  }

  async findLastsBySensorId(
    sensorId: string,
    limit: number = 1
  ): Promise<Measure[]> {
    const searchingObject = { sensor: sensorId };
    const docs = await MeasureModel.find(searchingObject)
      .sort({ date: -1 })
      .limit(limit);
    rejectIfNull('Sensor not found', docs);
    return normalizeData(docs);
  }

  async findAllByTypeIds(
    sensorTypeIds: string[],
    options: FindAllOptions = {}
  ) {
    const paginationReq = options.paginationRequest;
    const filter = options.filter;
    const gte = filter && filter.gte ? filter.gte : null;
    const lte = filter && filter.lte ? filter.lte : null;
    const sortBy: string = filter && filter.sortBy ? filter.sortBy : null;
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject['sensor.type'] = { $in: sensorTypeIds };
    const query = MeasureModel.find(searchingObject)
      .populate({
        path: 'sensor',
        populate: {
          path: 'type'
        }
      })
      .sort(sortBy);
    const countQuery = MeasureModel.find(
      searchingObject
    ).estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, paginationReq);
    return pagedData;
  }

  async findAllByTypeId(sensorTypeId: string, options: FindAllOptions = {}) {
    const paginationReq = options.paginationRequest;
    const filter = options.filter;
    const gte = filter && filter.gte ? filter.gte : null;
    const lte = filter && filter.lte ? filter.lte : null;
    const sortBy: string = filter && filter.sortBy ? filter.sortBy : null;
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject['sensor.type'] = sensorTypeId;
    const query = MeasureModel.find(searchingObject)
      .populate({
        path: 'sensor',
        populate: {
          path: 'type'
        }
      })
      .sort(sortBy);
    const countQuery = MeasureModel.find(
      searchingObject
    ).estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, paginationReq);
    return pagedData;
  }

  async findAllBySensorIds(sensorIds: string[], options: FindAllOptions = {}) {
    const paginationReq = options.paginationRequest;
    const filter = options.filter;
    const gte = filter && filter.gte ? filter.gte : null;
    const lte = filter && filter.lte ? filter.lte : null;
    const sortBy: string = filter && filter.sortBy ? filter.sortBy : null;
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject['sensor'] = { $in: sensorIds };
    const query = MeasureModel.find(searchingObject).sort(sortBy);
    const countQuery = MeasureModel.find(
      searchingObject
    ).estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, paginationReq);
    return pagedData;
  }

  async findAllBySensorId(sensorId: string, options: FindAllOptions = {}) {
    const paginationReq = options.paginationRequest;
    const filter = options.filter;
    const gte = filter && filter.gte ? filter.gte : null;
    const lte = filter && filter.lte ? filter.lte : null;
    const sortBy: string = filter && filter.sortBy ? filter.sortBy : null;
    const searchingObject = getSearchingObject(gte, lte);
    searchingObject['sensor'] = sensorId;
    const query = MeasureModel.find(searchingObject).sort(sortBy);
    const countQuery = MeasureModel.find(
      searchingObject
    ).estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, paginationReq);
    return pagedData;
  }

  async create(document: Measure): Promise<Measure> {
    const doc = await MeasureModel.create(document);
    return normalizeData(doc);
  }

  async update(document: Measure): Promise<Measure> {
    const doc = await MeasureModel.findByIdAndUpdate(document.id, document, {
      new: true
    }).exec();
    rejectIfNull('Measure not found', doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<Measure> {
    const doc = await MeasureModel.findByIdAndRemove(id).exec();
    rejectIfNull('Measure not found', doc);
    return normalizeData(doc);
  }

  async findAll(pagination: PaginationRequest = defaultPagination) {
    const query = MeasureModel.find()
      .sort({ date: 1 })
      .populate({
        path: 'sensor',
        populate: {
          path: 'type'
        }
      });
    const countQuery = MeasureModel.estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, pagination);
    return pagedData;
  }

  async findAllDistinct(pagination: PaginationRequest = defaultPagination) {
    const query = MeasureModel.find()
      .sort({ date: -1 })
      .distinct('sensor')
      .populate({
        path: 'sensor',
        populate: {
          path: 'type'
        }
      });
    const countQuery = MeasureModel.distinct('sensor').estimatedDocumentCount();
    const pagedData = await paginateQuery(query, countQuery, pagination);
    return pagedData;
  }

  async find(id: string): Promise<Measure> {
    const doc = await MeasureModel.findById(id)
      .populate({
        path: 'sensor',
        populate: {
          path: 'type'
        }
      })
      .exec();
    rejectIfNull('Measure not found', doc);
    return normalizeData(doc);
  }
}
