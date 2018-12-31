import mongoose = require('mongoose');
import { rejectIfNull, normalizeData } from './helpers';
import { SensorRepository } from '../interface/sensor-repository';
import { Sensor } from '../../models/interface/sensor';

interface SensorModel extends Sensor, mongoose.Document {
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

const SensorModel = mongoose.model<SensorModel>('Sensor', sensorSchema);

export class SensorMongooseRepository implements SensorRepository {

    create(document: Sensor): Promise<Sensor> {
        return SensorModel.create(document)
        .then(rejectIfNull('Sensor not found'))
        .then((o: SensorModel) => SensorModel.populate(o, {
            path: 'type'
        }))
        .then(normalizeData);
    }

    update(document: Sensor): Promise<Sensor> {
        return SensorModel.findByIdAndUpdate(document.id, document,
            {'new': true})
        .exec()
        .then(rejectIfNull('Sensor not found'))
        .then(normalizeData);
    }

    remove(id: string): Promise<Sensor> {
        return SensorModel.findByIdAndRemove(id)
        .exec()
        .then(rejectIfNull('Sensor not found'))
        .then(normalizeData);
    }

    findAll(): Promise<Sensor[]> {
        return SensorModel.find()
        .populate('type')
        .exec()
        .then(normalizeData);
    }

    find(id: string): Promise<Sensor> {
        return SensorModel.findById(id)
        .populate('type')
        .then(rejectIfNull('Sensor not found'))
        .then(normalizeData);
    }
}
