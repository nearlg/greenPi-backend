import mongoose = require('mongoose');
import { rejectIfNull, toObject, normalizeFiledNames } from "./helpers";
import { ISensorTypeRepository } from "../../shared/sensor-type-repository";
import { ISensorType } from "../../../../interface/sensor-type";

export interface ISensorTypeModel extends ISensorType, mongoose.Document {
}

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
        description: String,
        //required: [true, 'A sensor must have the unit']
    }
});

const SensorTypeModel = mongoose.model<ISensorTypeModel>('SensorType', sensorSchema);

export class SensorTypeRepository implements ISensorTypeRepository {

    create(document: ISensorType): Promise<ISensorType> {
        return SensorTypeModel.create(document)
        .then(rejectIfNull('Sensor type not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: ISensorType): Promise<ISensorType> {
        return SensorTypeModel.findByIdAndUpdate(document.id, document,
            {'new': true}).exec()
        .then(rejectIfNull('Sensor type not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    remove(id: string): Promise<ISensorType> {
        return SensorTypeModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Sensor type not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findAll(): Promise<ISensorType[]> {
        return SensorTypeModel.find().exec()
        .then(toObject)
        .then(normalizeFiledNames);
    }

    find(id: string): Promise<ISensorType> {
        return SensorTypeModel.findById(id).exec()
        .then(rejectIfNull('Sensor type not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }
}

export const sensorTypeRepository = new SensorTypeRepository();
