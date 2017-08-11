import { ISensor } from "../models/interface/sensor";
import { sensorRepository } from "../models/database/repository/implementation/mongoose4/sensor-repository"

export function addSensor(sensor: ISensor): Promise<ISensor> {
    return sensorRepository.create(sensor);
}

export function updateSensor(sensor: ISensor): Promise<ISensor> {
    return sensorRepository.update(sensor);
}

export function updateSensorById(id: string, sensor: ISensor): Promise<ISensor> {
    return sensorRepository.updateById(id, sensor);
}

export function deleteSensor(sensor: ISensor): Promise<void> {
    return sensorRepository.remove(sensor);
}

export function deleteSensorById(id: string): Promise<void> {
    return sensorRepository.removeById(id);
}

export function fetchSensors(): Promise<ISensor[]> {
    return sensorRepository.findAll();
}

export function getSensorById(id: string): Promise<ISensor> {
    return sensorRepository.findById(id);
}