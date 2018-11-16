import mongoose = require('mongoose');
import { rejectIfNull, normalizeData } from "./helpers";
import { ISensorRepository } from "../../shared/sensor-repository";
import { ISensor } from "../../../../interface/sensor";

export interface ISensorModel extends ISensor, mongoose.Document {
}

const sensorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A sensor must have a name']
    },
    description: String,
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SensorType',
        required: [true, 'A sensor must have a sensor type']
    },
    connectionPorts: [Number]
});

const SensorModel = mongoose.model<ISensorModel>('Sensor', sensorSchema);

export class SensorRepository implements ISensorRepository {

    create(document: ISensor): Promise<ISensor> {
        return SensorModel.create(document)
        .then(rejectIfNull('Sensor not found'))
        .then((o: ISensorModel) => SensorModel.populate(o, {
            path: 'type'
        }))
        .then(normalizeData);
    }

    update(document: ISensor): Promise<ISensor> {
        return SensorModel.findByIdAndUpdate(document.id, document,
            {'new': true}).exec()
        .then(rejectIfNull('Sensor not found'))
        .then(normalizeData);
    }

    remove(id: string): Promise<ISensor> {
        return SensorModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Sensor not found'))
        .then(normalizeData);
    }

    findAll(): Promise<ISensor[]> {
        return SensorModel.find()
        .populate('type')
        .exec()
        .then(normalizeData);
    }

    find(id: string): Promise<ISensor> {
        return SensorModel.findById(id)
        .populate('type')
        .then(rejectIfNull('Sensor not found'))
        .then(normalizeData);
    }
}

export const sensorRepository = new SensorRepository();
