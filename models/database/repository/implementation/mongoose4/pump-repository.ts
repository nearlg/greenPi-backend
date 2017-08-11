import mongoose = require('mongoose');
import { rejectIfNull, toObject, renameId, toObjectAll, renameIdAll } from "./helpers";
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
            .then(renameId);
    }

    update(document: IPump): Promise<IPump> {
        return PumpModel.findByIdAndUpdate(document.id, document, {'new': true}).exec()
            .then(rejectIfNull('Pump not found'))
            .then(toObject)
            .then(renameId);
    }

    updateById(id: string, document: IPump): Promise<IPump>{
        return PumpModel.findByIdAndUpdate(id, document).exec();
    }

    remove(document: IPump): Promise<void> {
        return PumpModel.findByIdAndRemove(document.id).exec()
            .then(rejectIfNull('Pump not found'))
            .then(() => null);
    }

    removeById(id: string): Promise<void> {
        return PumpModel.findByIdAndRemove(id).exec()
            .then(rejectIfNull('Pump not found'))
            .then(() => null);
    }

    findAll(): Promise<IPump[]> {
        return PumpModel.find().exec()
            .then(toObjectAll)
            .then(renameIdAll);
    }

    findById(id: string): Promise<null|IPump> {
        return PumpModel.findById(id).exec()
            .then(rejectIfNull('Pump not found'))
            .then(toObject)
            .then(renameId);
    }
}

export const pumpRepository = new PumpRepository();