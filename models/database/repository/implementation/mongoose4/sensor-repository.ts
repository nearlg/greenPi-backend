import mongoose = require('mongoose');
import { rejectIfNull, toObject, normalizeFiledNames } from "./helpers";
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
            .then(toObject)
            .then(normalizeFiledNames);
    }

    update(document: ISensor): Promise<ISensor> {
        return SensorModel.findByIdAndUpdate(document.id, document, {'new': true}).exec()
            .then(rejectIfNull('Sensor not found'))
            .then(toObject)
            .then(normalizeFiledNames);
    }

    updateById(id: string, document: ISensor): Promise<ISensor>{
        return SensorModel.findByIdAndUpdate(id, document).exec();
    }

    remove(document: ISensor): Promise<void> {
        return SensorModel.findByIdAndRemove(document.id).exec()
            .then(rejectIfNull('Sensor not found'))
            .then(() => null);
    }

    removeById(id: string): Promise<void> {
        return SensorModel.findByIdAndRemove(id).exec()
            .then(rejectIfNull('Sensor not found'))
            .then(() => null);
    }

    findAll(): Promise<ISensor[]> {
        return SensorModel.find()
            .populate('type')
            .exec()
            .then(toObject)
            .then(normalizeFiledNames);
    }

    findById(id: string): Promise<null|ISensor> {
        return SensorModel.findById(id)
            .populate('type')
            .then(rejectIfNull('Sensor not found'))
            .then(toObject)
            .then(normalizeFiledNames);
    }
}

export const sensorRepository = new SensorRepository();
