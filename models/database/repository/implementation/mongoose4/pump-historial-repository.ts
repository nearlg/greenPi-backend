import mongoose = require('mongoose');
import { rejectIfNull, toObject, normalizeFiledNames } from "./helpers";
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

    findAllByPumpIds(pumpIds: string[], gte: Date, lte: Date, sortBy: string): Promise<IPumpHistorial[]> {
        return PumpHistorialModel.find({
            pump: { $in: pumpIds },
            date: { $gte: gte, $lte: lte }
        })
        .populate('pump')
        .sort(sortBy)
        .then(toObject)
        .then(normalizeFiledNames);
    }
    findAllByPumps(pumps: IPump[], gte: Date, lte: Date, sortBy?: string): Promise<IPumpHistorial[]> {
        let pumpIds: string[] = pumps.map(pump => pump.id);
        return this.findAllByPumpIds(pumpIds, gte, lte, sortBy);
    }
    findAllByPumpId(pumpId: string, gte: Date, lte: Date, sortBy: string = 'date'): Promise<null | IPumpHistorial[]> {
        return PumpHistorialModel.find({
            pump: pumpId,
            date: { $gte: gte, $lte: lte }
        })
        .populate('pump')
        .sort(sortBy)
        .then(toObject)
        .then(normalizeFiledNames);
    }
    findAllByPump(pump: IPump, gte: Date, lte: Date, sortBy?: string): Promise<null | IPumpHistorial[]> {
        return this.findAllByPumpId(pump.id, gte, lte, sortBy);
    }

    create(document: IPumpHistorial): Promise<IPumpHistorial> {
        return PumpHistorialModel.create(document)
        .then(rejectIfNull('Pump historial not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: IPumpHistorial): Promise<IPumpHistorial> {
        return PumpHistorialModel.findByIdAndUpdate(document.id, document, {'new': true})
        .populate('pump')
        .exec()
        .then(rejectIfNull('Pump historial not found'))
        .then(toObject)
        .then(normalizeFiledNames);
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
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findById(id: string): Promise<null|IPumpHistorial> {
        return PumpHistorialModel.findById(id)
        .populate('pump')
        .exec()
        .then(rejectIfNull('Pump historial not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }
}

export const pumpHistorialRepository = new PumpHistorialRepository();
