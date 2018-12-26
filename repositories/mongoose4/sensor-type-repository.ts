import mongoose = require('mongoose');
import { rejectIfNull, normalizeData } from './helpers';
import { SensorTypeRepository } from '../interface/sensor-type-repository';
import { SensorType } from '../../models/interface/sensor-type';

interface SensorTypeModel extends SensorType, mongoose.Document {
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

const SensorTypeModel = mongoose.model<SensorTypeModel>('SensorType', sensorSchema);

export class SensorTypeMongooseRepository implements SensorTypeRepository {

    create(document: SensorType): Promise<SensorType> {
        return SensorTypeModel.create(document)
        .then(rejectIfNull('Sensor type not found'))
        .then(normalizeData);
    }

    update(document: SensorType): Promise<SensorType> {
        return SensorTypeModel.findByIdAndUpdate(document.id, document,
            {'new': true}).exec()
        .then(rejectIfNull('Sensor type not found'))
        .then(normalizeData);
    }

    remove(id: string): Promise<SensorType> {
        return SensorTypeModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Sensor type not found'))
        .then(normalizeData);
    }

    findAll(): Promise<SensorType[]> {
        return SensorTypeModel.find().exec()
        .then(normalizeData);
    }

    find(id: string): Promise<SensorType> {
        return SensorTypeModel.findById(id).exec()
        .then(rejectIfNull('Sensor type not found'))
        .then(normalizeData);
    }
}
