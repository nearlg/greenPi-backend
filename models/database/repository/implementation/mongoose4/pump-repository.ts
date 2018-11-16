import mongoose = require('mongoose');
import { rejectIfNull, normalizeData } from "./helpers";
import { IPumpRepository } from "../../shared/pump-repository";
import { IPump } from "../../../../interface/pump";

export interface IPumpModel extends IPump, mongoose.Document {
}

const pumpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A pump must have a name']
    },
    description: String,
    connectionPorts: [Number]
});

const PumpModel = mongoose.model<IPumpModel>('Pump', pumpSchema);

export class PumpRepository implements IPumpRepository {

    create(document: IPump): Promise<IPump> {
        return PumpModel.create(document)
        .then(rejectIfNull('Pump not found'))
        .then(normalizeData);
    }

    update(document: IPump): Promise<IPump> {
        return PumpModel.findByIdAndUpdate(document.id, document,
            {'new': true}).exec()
        .then(rejectIfNull('Pump not found'))
        .then(normalizeData);
    }

    remove(id: string): Promise<IPump> {
        return PumpModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Pump not found'))
        .then(normalizeData);
    }

    findAll(): Promise<IPump[]> {
        return PumpModel.find().exec()
        .then(normalizeData);
    }

    find(id: string): Promise<IPump> {
        return PumpModel.findById(id).exec()
        .then(rejectIfNull('Pump not found'))
        .then(normalizeData);
    }
}

export const pumpRepository = new PumpRepository();
