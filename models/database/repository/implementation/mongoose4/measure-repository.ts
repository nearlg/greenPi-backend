import mongoose = require('mongoose');
import { rejectIfNull, toObject, normalizeFiledNames, getSearchingObject } from "./helpers";
import { IMeasureRepository } from "../../shared/measure-repository";
import { IMeasure } from "../../../../interface/measure";
import { ISensor } from "../../../../interface/sensor";

export interface IMeasureModel extends IMeasure, mongoose.Document {
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

const MeasureModel = mongoose.model<IMeasureModel>('Measure', measureSchema);

export class MeasureRepository implements IMeasureRepository {

    findLastsBySensorIds(sensorIds: string[]): Promise<IMeasure[]> {
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

    findLastBySensorId(sensorId: string): Promise<IMeasure> {
        const searchingObject = { sensor: sensorId };
        return MeasureModel.find(searchingObject)
        .sort({date: -1})
        .limit(1)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .then(rejectIfNull('Measure not found'))
        .then(toObject)
        .then(normalizeFiledNames)
        .then(doc => doc[0]);
    }

    findAllByTypeIds(sensorTypeIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<IMeasure[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['sensor.type'] = { $in: sensorTypeIds };
        return MeasureModel.find(searchingObject)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .sort(sortBy)
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findAllByTypeId(sensorTypeId: string, sortBy?: string, gte?: Date, lte?: Date): Promise<IMeasure[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['sensor.type'] = sensorTypeId;
        return MeasureModel.find(searchingObject)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .sort(sortBy)
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findAllBySensorIds(sensorIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<IMeasure[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['sensor'] = { $in: sensorIds };
        return MeasureModel.find(searchingObject)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .sort(sortBy)
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findAllBySensors(sensors: ISensor[], sortBy?: string, gte?: Date, lte?: Date): Promise<IMeasure[]> {
        let sensorIds: string[] = sensors.map(sensor => sensor.id);
        return this.findAllBySensorIds(sensorIds, sortBy, gte, lte);
    }

    findAllBySensorId(sensorId: string, sortBy: string = 'date', gte: Date, lte: Date): Promise<null | IMeasure[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['sensor'] = sensorId;
        return MeasureModel.find(searchingObject)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .sort(sortBy)
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findAllBySensor(sensor: ISensor, sortBy?: string, gte?: Date, lte?: Date): Promise<null|IMeasure[]> {
        return this.findAllBySensorId(sensor.id, sortBy, gte, lte);
    }

    create(document: IMeasure): Promise<IMeasure> {
        return MeasureModel.create(document)
        .then(measure => MeasureModel.populate(measure, {
            path:'sensor',
            populate: {
                path: 'type'
            }
        }))
        .then(rejectIfNull('Measure not found'))
        .then((o: IMeasureModel) => MeasureModel.populate(o, {
            path: 'sensor',
            populate: {
                path: 'type'
            }
        }))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: IMeasure): Promise<IMeasure> {
        return MeasureModel.findByIdAndUpdate(document.id, document, {'new': true})
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .exec()
        .then(rejectIfNull('Measure not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    remove(id: string): Promise<IMeasure> {
        return MeasureModel.findByIdAndRemove(id)
        .exec()
        .then(rejectIfNull('Measure not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findAll(): Promise<IMeasure[]> {
        return MeasureModel.find()
        .sort({date: 1})
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .exec()
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findAllDistinct(): Promise<IMeasure[]> {
        return MeasureModel.find()
        .sort({date: -1})
        .distinct('sensor')
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .exec()
        .then(toObject)
        .then(normalizeFiledNames);
    }

    find(id: string): Promise<IMeasure> {
        return MeasureModel.findById(id)
        .populate({path:'sensor', populate: {
            path: 'type'
        }})
        .exec()
        .then(rejectIfNull('Measure not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }
}

export const measureRepository = new MeasureRepository();
