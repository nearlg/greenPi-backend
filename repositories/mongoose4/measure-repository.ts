import mongoose = require('mongoose');
import { rejectIfNull, normalizeData, getSearchingObject } from './helpers';
import { MeasureRepository } from '../interface/measure-repository';
import { Measure } from '../../models/interface/measure';
import { Sensor } from '../../models/interface/sensor';

interface MeasureModel extends Measure, mongoose.Document {
}

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

export class MeasureMongooseRepository implements MeasureRepository {

    findLastsBySensorIds(sensorIds: string[]): Promise<Measure[]> {
        // If it can not find a measure,
        // it will be undefined in the 'measures' array
        const measures = sensorIds.map(sensorId =>
            this.findLastBySensorId(sensorId)
            .catch(error => undefined)
        );
        // Remove all the undefined elements from the array
        return Promise.all(measures)
        .then(measures => measures.filter(m => m != undefined));
    }

    findLastBySensorId(sensorId: string): Promise<Measure> {
        const searchingObject = { sensor: sensorId };
        return MeasureModel.find(searchingObject)
        .sort({date: -1})
        .limit(1)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .then(rejectIfNull('Measure not found'))
        .then(normalizeData)
        .then(doc => doc[0]);
    }

    findAllByTypeIds(sensorTypeIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<Measure[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['sensor.type'] = { $in: sensorTypeIds };
        return MeasureModel.find(searchingObject)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .sort(sortBy)
        .then(normalizeData);
    }

    findAllByTypeId(sensorTypeId: string, sortBy?: string, gte?: Date, lte?: Date): Promise<Measure[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['sensor.type'] = sensorTypeId;
        return MeasureModel.find(searchingObject)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .sort(sortBy)
        .then(normalizeData);
    }

    findAllBySensorIds(sensorIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<Measure[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['sensor'] = { $in: sensorIds };
        return MeasureModel.find(searchingObject)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .sort(sortBy)
        .then(normalizeData);
    }

    findAllBySensors(sensors: Sensor[], sortBy?: string, gte?: Date, lte?: Date): Promise<Measure[]> {
        let sensorIds: string[] = sensors.map(sensor => sensor.id);
        return this.findAllBySensorIds(sensorIds, sortBy, gte, lte);
    }

    findAllBySensorId(sensorId: string, sortBy: string = 'date', gte: Date, lte: Date): Promise<null | Measure[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['sensor'] = sensorId;
        return MeasureModel.find(searchingObject)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .sort(sortBy)
        .then(normalizeData);
    }

    findAllBySensor(sensor: Sensor, sortBy?: string, gte?: Date, lte?: Date): Promise<null|Measure[]> {
        return this.findAllBySensorId(sensor.id, sortBy, gte, lte);
    }

    create(document: Measure): Promise<Measure> {
        return MeasureModel.create(document)
        .then(measure => MeasureModel.populate(measure, {
            path:'sensor',
            populate: {
                path: 'type'
            }
        }))
        .then(rejectIfNull('Measure not found'))
        .then((o: MeasureModel) => MeasureModel.populate(o, {
            path: 'sensor',
            populate: {
                path: 'type'
            }
        }))
        .then(normalizeData);
    }

    update(document: Measure): Promise<Measure> {
        return MeasureModel.findByIdAndUpdate(document.id, document, {'new': true})
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .exec()
        .then(rejectIfNull('Measure not found'))
        .then(normalizeData);
    }

    remove(id: string): Promise<Measure> {
        return MeasureModel.findByIdAndRemove(id)
        .exec()
        .then(rejectIfNull('Measure not found'))
        .then(normalizeData);
    }

    findAll(): Promise<Measure[]> {
        return MeasureModel.find()
        .sort({date: 1})
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .exec()
        .then(normalizeData);
    }

    findAllDistinct(): Promise<Measure[]> {
        return MeasureModel.find()
        .sort({date: -1})
        .distinct('sensor')
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .exec()
        .then(normalizeData);
    }

    find(id: string): Promise<Measure> {
        return MeasureModel.findById(id)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .exec()
        .then(rejectIfNull('Measure not found'))
        .then(normalizeData);
    }
}
