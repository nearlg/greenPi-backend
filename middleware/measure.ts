import { IMeasure } from "../models/interface/measure";
import { measureRepository } from "../models/database/repository/implementation/mongoose4/measure-repository"
import { environmentRepository } from "../models/database/repository/implementation/mongoose4/environment-repository"
import { ISensor } from "../models/interface/sensor";

export function fetchByEnvironmentId(environmentId: string, gte: Date, lte: Date, sortBy?: string): Promise<null | IMeasure[]> {
    return environmentRepository.findById(environmentId)
    .then(environment => measureRepository.findAllBySensors(<Array<ISensor>>environment.sensors, gte, lte, sortBy));
}

export function fetchBySensorId(sensorId: string, gte: Date, lte: Date, sortBy?: string): Promise<null | IMeasure[]> {
    return measureRepository.findAllBySensorId(sensorId, gte, lte, sortBy);
}

export function fetchBySensor(sensor: ISensor, gte: Date, lte: Date, sortBy?: string): Promise<null | IMeasure[]> {
    return measureRepository.findAllBySensor(sensor, gte, lte, sortBy);
}

export function addMeasure(measure: IMeasure): Promise<IMeasure> {
    return measureRepository.create(measure);
}

export function updateMeasure(measure: IMeasure): Promise<IMeasure> {
    return measureRepository.update(measure);
}

export function updateMeasureById(id: string, measure: IMeasure): Promise<IMeasure> {
    return measureRepository.updateById(id, measure);
}

export function deleteMeasure(measure: IMeasure): Promise<void> {
    return measureRepository.remove(measure);
}

export function deleteMeasureById(id: string): Promise<void> {
    return measureRepository.removeById(id);
}

export function fetchMeasures(): Promise<IMeasure[]> {
    return measureRepository.findAll();
}

export function getMeasureById(id: string): Promise<IMeasure> {
    return measureRepository.findById(id);
}