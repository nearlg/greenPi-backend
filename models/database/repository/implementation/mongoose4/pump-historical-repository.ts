import mongoose = require('mongoose');
import { rejectIfNull, toObject, normalizeFiledNames, getSearchingObject } from "./helpers";
import { IPumpHistoricalRepository } from "../../shared/pump-historical-repository";
import { IPumpHistorical } from "../../../../interface/pump-historical";
import { IPump } from "../../../../interface/pump";

export interface IPumpHistoricalModel extends IPumpHistorical, mongoose.Document {
}

const pumpHistoricalSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
        required: [true, 'A pump historical must have a date']
    },
    pump: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pump',
        required: [true, 'A pump historical must have a pump']
    },
    state: {
        type: Number,
        required: [true, 'A pump historical must have the state']
    }
});

const PumpHistoricalModel = mongoose.model<IPumpHistoricalModel>('PumpHistorical', pumpHistoricalSchema);

export class PumpHistoricalRepository implements IPumpHistoricalRepository {

    findAllByPumpIds(pumpIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<IPumpHistorical[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['pump'] = { $in: pumpIds };
        return PumpHistoricalModel.find(searchingObject)
        .populate('pump')
        .sort(sortBy)
        .then(toObject)
        .then(normalizeFiledNames);
    }
    findAllByPumps(pumps: IPump[], sortBy?: string, gte?: Date, lte?: Date): Promise<IPumpHistorical[]> {
        let pumpIds: string[] = pumps.map(pump => pump.id);
        return this.findAllByPumpIds(pumpIds, sortBy, gte, lte);
    }
    findAllByPumpId(pumpId: string, sortBy: string = 'date', gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['pump'] = pumpId;
        return PumpHistoricalModel.find(searchingObject)
        .populate('pump')
        .sort(sortBy)
        .then(toObject)
        .then(normalizeFiledNames);
    }
    findAllByPump(pump: IPump, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]> {
        return this.findAllByPumpId(pump.id, sortBy, gte, lte);
    }

    create(document: IPumpHistorical): Promise<IPumpHistorical> {
        return PumpHistoricalModel.create(document)
        .then(rejectIfNull('Pump historical not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: IPumpHistorical): Promise<IPumpHistorical> {
        return PumpHistoricalModel.findByIdAndUpdate(document.id, document, {'new': true})
        .populate('pump')
        .exec()
        .then(rejectIfNull('Pump historical not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    updateById(id: string, document: IPumpHistorical): Promise<IPumpHistorical>{
        return PumpHistoricalModel.findByIdAndUpdate(id, document)
        .populate('pump')
        .exec();
    }

    remove(document: IPumpHistorical): Promise<void> {
        return PumpHistoricalModel.findByIdAndRemove(document.id).exec()
        .then(rejectIfNull('Pump historical not found'))
        .then(() => null);
    }

    removeById(id: string): Promise<void> {
        return PumpHistoricalModel.findByIdAndRemove(id).exec()
        .then(rejectIfNull('Pump historical not found'))
        .then(() => null);
    }

    findAll(): Promise<IPumpHistorical[]> {
        return PumpHistoricalModel.find()
        .populate('pump')
        .exec()
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findById(id: string): Promise<null|IPumpHistorical> {
        return PumpHistoricalModel.findById(id)
        .populate('pump')
        .exec()
        .then(rejectIfNull('Pump historical not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }
}

export const pumpHistoricalRepository = new PumpHistoricalRepository();
