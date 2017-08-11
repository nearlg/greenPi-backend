import { ISensorType } from "../models/interface/sensor-type";
import { sensorTypeRepository } from "../models/database/repository/implementation/mongoose4/sensor-type-repository"

export function addSensorType(sensorType: ISensorType): Promise<ISensorType> {
    return sensorTypeRepository.create(sensorType);
}

export function updateSensorType(sensorType: ISensorType): Promise<ISensorType> {
    return sensorTypeRepository.update(sensorType);
}

export function updateSensorTypeById(id: string, sensorType: ISensorType): Promise<ISensorType> {
    return sensorTypeRepository.updateById(id, sensorType);
}

export function deleteSensorType(sensorType: ISensorType): Promise<void> {
    return sensorTypeRepository.remove(sensorType);
}

export function deleteSensorTypeById(id: string): Promise<void> {
    return sensorTypeRepository.removeById(id);
}

export function fetchSensorTypes(): Promise<ISensorType[]> {
    return sensorTypeRepository.findAll();
}

export function getSensorTypeById(id: string): Promise<ISensorType> {
    return sensorTypeRepository.findById(id);
}