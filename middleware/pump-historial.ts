import { IPumpHistorial } from "../models/interface/pump-historial";
import { pumpHistorialRepository } from "../models/database/repository/implementation/mongoose4/pump-historial-repository"
import { environmentRepository } from "../models/database/repository/implementation/mongoose4/environment-repository"
import { IPump } from "../models/interface/pump";

export function fetchByEnvironmentId(environmentId: string, gte: Date, lte: Date, sortBy?: string): Promise<null | IPumpHistorial[]> {
    return environmentRepository.findById(environmentId)
    .then(environment => pumpHistorialRepository.findAllByPumps(<Array<IPump>>environment.pumps, gte, lte, sortBy));
}

export function fetchByPumpId(pumpId: string, gte: Date, lte: Date, sortBy: string): Promise<null | IPumpHistorial[]> {
    return pumpHistorialRepository.findAllByPumpId(pumpId, gte, lte, sortBy);
}

export function fetchByPump(pump: IPump, gte: Date, lte: Date, sortBy?: string): Promise<null | IPumpHistorial[]> {
    return pumpHistorialRepository.findAllByPump(pump, gte, lte, sortBy);
}

export function addPumpHistorial(pumpHistorial: IPumpHistorial): Promise<IPumpHistorial> {
    return pumpHistorialRepository.create(pumpHistorial);
}

export function updatePumpHistorial(pumpHistorial: IPumpHistorial): Promise<IPumpHistorial> {
    return pumpHistorialRepository.update(pumpHistorial);
}

export function updatePumpHistorialById(id: string, pumpHistorial: IPumpHistorial): Promise<IPumpHistorial> {
    return pumpHistorialRepository.updateById(id, pumpHistorial);
}

export function deletePumpHistorial(pumpHistorial: IPumpHistorial): Promise<void> {
    return pumpHistorialRepository.remove(pumpHistorial);
}

export function deletePumpHistorialById(id: string): Promise<void> {
    return pumpHistorialRepository.removeById(id);
}

export function fetchPumpHistorials(): Promise<IPumpHistorial[]> {
    return pumpHistorialRepository.findAll();
}

export function getPumpHistorialById(id: string): Promise<IPumpHistorial> {
    return pumpHistorialRepository.findById(id);
}