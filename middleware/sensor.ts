import { ISensor } from "../models/interface/sensor";
import { sensorRepository } from "../models/database/repository/implementation/mongoose4/sensor-repository"
import { sensorTypeRepository } from "../models/database/repository/implementation/mongoose4/sensor-type-repository"
import { ISensorType } from "../models/interface/sensor-type";

function validateDependencies(sensor: ISensor): Promise<ISensor> {
    const sensorTypeId: string = (<ISensorType>sensor.type).name ||
        <string>sensor.type;
    return sensorTypeRepository.findById(sensorTypeId)
    .then(() => sensor);
}

export function addSensor(sensor: ISensor): Promise<ISensor> {
    return validateDependencies(sensor)
    .then(() => sensorRepository.create(sensor));
}

export function updateSensor(sensor: ISensor): Promise<ISensor> {
    return validateDependencies(sensor)
    .then(() => sensorRepository.update(sensor));
}

export function updateSensorById(id: string, sensor: ISensor): Promise<ISensor> {
    return validateDependencies(sensor)
    .then(() => sensorRepository.updateById(id, sensor));
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
