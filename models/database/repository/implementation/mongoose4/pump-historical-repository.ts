import mongoose = require('mongoose');
import { rejectIfNull, normalizeData, getSearchingObject } from "./helpers";
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

    findLastsByPumpIds(pumpIds: string[]): Promise<IPumpHistoricalModel[]> {
        // If it can not find a measure,
        // it will be undefined in the 'measures' array
        const pumpHistoricals = pumpIds.map(pumpId =>
            this.findLastByPumpId(pumpId)
            .catch(error => undefined)
        );
        // Remove all the undefined elements from the array
        return Promise.all(pumpHistoricals)
        .then(p => p.filter(p => p != undefined));
    }

    findLastByPumpId(pumpId: string): Promise<IPumpHistoricalModel> {
        const searchingObject = { pump: pumpId };
        return PumpHistoricalModel.find(searchingObject)
        .sort({date: -1})
        .limit(1)
        .populate('pump')
        .then(rejectIfNull('Measure not found'))
        .then(normalizeData)
        .then(doc => doc[0]);
    }

    findAllByPumpIds(pumpIds: string[], sortBy?: string, gte?: Date, lte?: Date):
    Promise<IPumpHistorical[]> {
        const searchingObject = getSearchingObject(gte, lte);
        searchingObject['pump'] = { $in: pumpIds };
        return PumpHistoricalModel.find(searchingObject)
        .populate('pump')
        .sort(sortBy)
        .then(normalizeData);
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
        .then(normalizeData);
    }

    findAllByPump(pump: IPump, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]> {
        return this.findAllByPumpId(pump.id, sortBy, gte, lte);
    }

    create(document: IPumpHistorical): Promise<IPumpHistorical> {
        return PumpHistoricalModel.create(document)
        .then(pumpHistorical => PumpHistoricalModel.populate(pumpHistorical, {
            path: 'pump'
        }))
        .then(rejectIfNull('Pump historical not found'))
        .then((o: IPumpHistoricalModel) => PumpHistoricalModel.populate(o, {
            path: 'pump'
        }))
        .then(normalizeData);
    }

    update(document: IPumpHistorical): Promise<IPumpHistorical> {
        return PumpHistoricalModel.findByIdAndUpdate(document.id, document,
            {'new': true})
        .populate('pump')
        .exec()
        .then(rejectIfNull('Pump historical not found'))
        .then(normalizeData);
    }

    remove(id: string): Promise<IPumpHistorical> {
        return PumpHistoricalModel.findByIdAndRemove(id)
        .exec()
        .then(rejectIfNull('Pump historical not found'))
        .then(normalizeData);
    }

    findAll(): Promise<IPumpHistorical[]> {
        return PumpHistoricalModel.find()
        .populate('pump')
        .exec()
        .then(normalizeData);
    }

    find(id: string): Promise<IPumpHistorical> {
        return PumpHistoricalModel.findById(id)
        .populate('pump')
        .exec()
        .then(rejectIfNull('Pump historical not found'))
        .then(normalizeData);
    }
}

export const pumpHistoricalRepository = new PumpHistoricalRepository();
