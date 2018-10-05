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
        return SensorTypeModel.findByIdAndUpdate(document.id, document, {'new': true}).exec()
            .then(rejectIfNull('Sensor type not found'))
            .then(toObject)
            .then(normalizeFiledNames);
    }

    updateById(id: string, document: ISensorType): Promise<ISensorType>{
        return SensorTypeModel.findByIdAndUpdate(id, document).exec()
        .then(rejectIfNull('Sensor type not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    remove(document: ISensorType): Promise<void> {
        return SensorTypeModel.findByIdAndRemove(document.id).exec()
            .then(rejectIfNull('Sensor type not found'))
            .then(() => null);
    }

    removeById(id: string): Promise<void> {
        return SensorTypeModel.findByIdAndRemove(id).exec()
            .then(rejectIfNull('Sensor type not found'))
            .then(() => null);
    }

    findAll(): Promise<ISensorType[]> {
        return SensorTypeModel.find().exec()
            .then(toObject)
            .then(normalizeFiledNames);
    }

    findById(id: string): Promise<null|ISensorType> {
        return SensorTypeModel.findById(id).exec()
            .then(rejectIfNull('Sensor type not found'))
            .then(toObject)
            .then(normalizeFiledNames);
    }
}

export const sensorTypeRepository = new SensorTypeRepository();
