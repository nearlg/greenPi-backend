import mongoose = require('mongoose');
import { rejectIfNull, toObject, normalizeFiledNames } from "./helpers";
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
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: IPump): Promise<IPump> {
        return PumpModel.findByIdAndUpdate(document.id, document,
            {'new': true}).exec()
        .then(rejectIfNull('Pump not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    remove(id: string): Promise<IPump> {
        return PumpModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Pump not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findAll(): Promise<IPump[]> {
        return PumpModel.find().exec()
        .then(toObject)
        .then(normalizeFiledNames);
    }

    find(id: string): Promise<IPump> {
        return PumpModel.findById(id).exec()
        .then(rejectIfNull('Pump not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }
}

export const pumpRepository = new PumpRepository();
