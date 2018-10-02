import mongoose = require('mongoose');
import { rejectIfNull, toObject, renameId, toObjectAll, renameIdAll, getSearchingObject } from "./helpers";
import { IPumpHistorialRepository } from "../../shared/pump-historial-repository";
import { IPumpHistorial } from "../../../../interface/pump-historial";
import { IPump } from "../../../../interface/pump";

export interface IPumpHistorialModel extends IPumpHistorial, mongoose.Document {
}

const pumpHistorialSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
        required: [true, 'A pump historial must have a date']
    },
    pump: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pump',
        required: [true, 'A pump historial must have a pump']
    },
    state: {
        type: Number,
        required: [true, 'A pump historial must have the state']
    }
});

const PumpHistorialModel = mongoose.model<IPumpHistorialModel>('PumpHistorial', pumpHistorialSchema);

export class PumpHistorialRepository implements IPumpHistorialRepository {

    findAllByPumpIds(pumpIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<IPumpHistorial[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['pump'] = { $in: pumpIds };
        return PumpHistorialModel.find(searchingObject)
        .populate('pump')
        .sort(sortBy)
        .then(toObjectAll)
        .then(renameIdAll);
    }
    findAllByPumps(pumps: IPump[], sortBy?: string, gte?: Date, lte?: Date): Promise<IPumpHistorial[]> {
        let pumpIds: string[] = pumps.map(pump => pump.id);
        return this.findAllByPumpIds(pumpIds, sortBy, gte, lte);
    }
    findAllByPumpId(pumpId: string, sortBy: string = 'date', gte?: Date, lte?: Date): Promise<null | IPumpHistorial[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['pump'] = pumpId;
        return PumpHistorialModel.find(searchingObject)
        .populate('pump')
        .sort(sortBy)
        .then(toObjectAll)
        .then(renameIdAll);
    }
    findAllByPump(pump: IPump, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorial[]> {
        return this.findAllByPumpId(pump.id, sortBy, gte, lte);
    }

    create(document: IPumpHistorial): Promise<IPumpHistorial> {
        return PumpHistorialModel.create(document)
        .then(rejectIfNull('Pump historial not found'))
        .then(toObject)
        .then(renameId);
    }

    update(document: IPumpHistorial): Promise<IPumpHistorial> {
        return PumpHistorialModel.findByIdAndUpdate(document.id, document, {'new': true})
        .populate('pump')
        .exec()
        .then(rejectIfNull('Pump historial not found'))
        .then(toObject)
        .then(renameId);
    }

    updateById(id: string, document: IPumpHistorial): Promise<IPumpHistorial>{
        return PumpHistorialModel.findByIdAndUpdate(id, document)
        .populate('pump')
        .exec();
    }

    remove(document: IPumpHistorial): Promise<void> {
        return PumpHistorialModel.findByIdAndRemove(document.id).exec()
        .then(rejectIfNull('Pump historial not found'))
        .then(() => null);
    }

    removeById(id: string): Promise<void> {
        return PumpHistorialModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Pump historial not found'))
        .then(() => null);
    }

    findAll(): Promise<IPumpHistorial[]> {
        return PumpHistorialModel.find()
        .populate('pump')
        .exec()
        .then(toObjectAll)
        .then(renameIdAll);
    }

    findById(id: string): Promise<null|IPumpHistorial> {
        return PumpHistorialModel.findById(id)
        .populate('pump')
        .exec()
        .then(rejectIfNull('Pump historial not found'))
        .then(toObject)
        .then(renameId);
    }
}

export const pumpHistorialRepository = new PumpHistorialRepository();
