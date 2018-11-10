import { IPumpHistorical } from "../models/interface/pump-historical";
import { pumpHistoricalRepository } from "../models/database/repository/implementation/mongoose4/pump-historical-repository"
import { environmentRepository } from "../models/database/repository/implementation/mongoose4/environment-repository"
import { IPump } from "../models/interface/pump";
import { pumpRepository } from "../models/database/repository/implementation/mongoose4/pump-repository";

function validateDependencies(pumpHistorical: IPumpHistorical): Promise<IPumpHistorical> {
    const pumpId: string = (<IPump>pumpHistorical.pump).id ||
        <string>pumpHistorical.pump;
    return pumpRepository.findById(pumpId)
    .then(() => pumpHistorical);
}

export function fetchByEnvironmentId(environmentId: string, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]> {
    return environmentRepository.findById(environmentId)
    .then(environment => pumpHistoricalRepository.findAllByPumps(<Array<IPump>>environment.pumps, sortBy, gte, lte));
}

export function fetchByPumpId(pumpId: string, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]> {
    return pumpRepository.findById(pumpId)
    .then(() => pumpHistoricalRepository.findAllByPumpId(pumpId, sortBy, gte, lte));
}

export function fetchByPump(pump: IPump, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]> {
    return pumpRepository.findById(pump.id)
    .then(() => pumpHistoricalRepository.findAllByPump(pump, sortBy, gte, lte));
}

export function addPumpHistorical(pumpHistorical: IPumpHistorical): Promise<IPumpHistorical> {
    return validateDependencies(pumpHistorical)
    .then(() => pumpHistoricalRepository.create(pumpHistorical));
}

export function updatePumpHistorical(pumpHistorical: IPumpHistorical): Promise<IPumpHistorical> {
    return validateDependencies(pumpHistorical)
    .then(() => pumpHistoricalRepository.update(pumpHistorical));
}

export function updatePumpHistoricalById(id: string, pumpHistorical: IPumpHistorical): Promise<IPumpHistorical> {
    return validateDependencies(pumpHistorical)
    .then(() => pumpHistoricalRepository.updateById(id, pumpHistorical));
}

export function deletePumpHistorical(pumpHistorical: IPumpHistorical): Promise<void> {
    return pumpHistoricalRepository.remove(pumpHistorical);
}

export function deletePumpHistoricalById(id: string): Promise<void> {
    return pumpHistoricalRepository.removeById(id);
}

export function fetchPumpHistoricals(): Promise<IPumpHistorical[]> {
    return pumpHistoricalRepository.findAll();
}

export function getPumpHistoricalById(id: string): Promise<IPumpHistorical> {
    return pumpHistoricalRepository.findById(id);
}
