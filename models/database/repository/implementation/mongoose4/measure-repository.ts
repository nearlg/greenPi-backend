import mongoose = require('mongoose');
import { rejectIfNull, toObject, renameId, toObjectAll, renameIdAll } from "./helpers";
import { IMeasureRepository } from "../../shared/measure-repository";
import { IMeasure } from "../../../../interface/measure";
import { ISensor } from "../../../../interface/sensor";
import { IEnvironment } from "../../../../interface/environment";

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
    findAllByTypeIds(sensorTypeIds: string[], gte: Date, lte: Date, sortBy: string): Promise<IMeasure[]> {
        return MeasureModel.find({
            'sensor.type': { $in: sensorTypeIds },
            date: { $gte: gte, $lte: lte }
        })
        .populate('sensor.type')
        .sort(sortBy)
        .then(toObjectAll)
        .then(renameIdAll);
    }
    findAllByTypeId(sensorTypeId: string, gte: Date, lte: Date, sortBy: string): Promise<IMeasure[]> {
        return MeasureModel.find({
            'sensor.type': sensorTypeId,
            date: { $gte: gte, $lte: lte }
        })
        .populate('sensor.type')
        .sort(sortBy)
        .then(toObjectAll)
        .then(renameIdAll);
    }

    findAllBySensorIds(sensorIds: string[], gte: Date, lte: Date, sortBy: string): Promise<IMeasure[]> {
        return MeasureModel.find({
            sensor: { $in: sensorIds },
            date: { $gte: gte, $lte: lte }
        })
        .populate('sensor.type')
        .sort(sortBy)
        .then(toObjectAll)
        .then(renameIdAll);
    }
    findAllBySensors(sensors: ISensor[], gte: Date, lte: Date, sortBy?: string): Promise<IMeasure[]> {
        let sensorIds: string[] = sensors.map(sensor => sensor.id);
        return this.findAllBySensorIds(sensorIds, gte, lte, sortBy);
    }
    findAllBySensorId(sensorId: string, gte: Date, lte: Date, sortBy: string = 'date'): Promise<null | IMeasure[]> {
        return MeasureModel.find({
            sensor: sensorId,
            date: { $gte: gte, $lte: lte }
        })
        .populate('sensor.type')
        .sort(sortBy)
        .then(toObjectAll)
        .then(renameIdAll);
    }
    findAllBySensor(sensor: ISensor, gte: Date, lte: Date, sortBy?: string): Promise<null|IMeasure[]> {
        return this.findAllBySensorId(sensor.id, gte, lte, sortBy);
    }

    create(document: IMeasure): Promise<IMeasure> {
        return MeasureModel.create(document)
        .then(rejectIfNull('Measure not found'))
        .then(toObject)
        .then(renameId);
    }

    update(document: IMeasure): Promise<IMeasure> {
        return MeasureModel.findByIdAndUpdate(document.id, document, {'new': true})
        .populate('sensor.type')
        .exec()
        .then(rejectIfNull('Measure not found'))
        .then(toObject)
        .then(renameId);
    }

    updateById(id: string, document: IMeasure): Promise<IMeasure>{
        return MeasureModel.findByIdAndUpdate(id, document)
        .populate('sensor.type')
        .exec();
    }

    remove(document: IMeasure): Promise<void> {
        return MeasureModel.findByIdAndRemove(document.id).exec()
        .then(rejectIfNull('Measure not found'))
        .then(() => null);
    }

    removeById(id: string): Promise<void> {
        return MeasureModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Measure not found'))
        .then(() => null);
    }

    findAll(): Promise<IMeasure[]> {
        return MeasureModel.find()
        .populate('sensor.type')
        .exec()
        .then(toObjectAll)
        .then(renameIdAll);
    }

    findById(id: string): Promise<null|IMeasure> {
        return MeasureModel.findById(id)
        .populate('sensor.type')
        .exec()
        .then(rejectIfNull('Measure not found'))
        .then(toObject)
        .then(renameId);
    }
}

export const measureRepository = new MeasureRepository();