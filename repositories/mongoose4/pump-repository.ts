import mongoose = require('mongoose');
import { rejectIfNull, normalizeData } from './helpers';
import { PumpRepository } from '../interface/pump-repository';
import { Pump } from '../../models/interface/pump';

interface PumpModel extends Pump, mongoose.Document {
}

const pumpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A pump must have a name']
    },
    description: String,
    connectionPorts: [Number]
});

const PumpModel = mongoose.model<PumpModel>('Pump', pumpSchema);

export class PumpMongooseRepository implements PumpRepository {

    create(document: Pump): Promise<Pump> {
        return PumpModel.create(document)
        .then(rejectIfNull('Pump not found'))
        .then(normalizeData);
    }

    update(document: Pump): Promise<Pump> {
        return PumpModel.findByIdAndUpdate(document.id, document,
            {'new': true}).exec()
        .then(rejectIfNull('Pump not found'))
        .then(normalizeData);
    }

    remove(id: string): Promise<Pump> {
        return PumpModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Pump not found'))
        .then(normalizeData);
    }

    findAll(): Promise<Pump[]> {
        return PumpModel.find().exec()
        .then(normalizeData);
    }

    find(id: string): Promise<Pump> {
        return PumpModel.findById(id).exec()
        .then(rejectIfNull('Pump not found'))
        .then(normalizeData);
    }
}
