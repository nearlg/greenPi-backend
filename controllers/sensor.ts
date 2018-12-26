import { Request, Response, Next } from 'restify';
import { handleJsonData, handleErrors } from './helpers';
import { Sensor } from '../models/interface/sensor';
import * as sensorValidator from '../validation/sensor';
import { sensorRepository, sensorTypeRepository } from '../repositories';
import { SensorType } from '../models/interface/sensor-type';

function validateDependencies(sensor: Sensor): Promise<Sensor> {
    const sensorTypeId: string = (<SensorType>sensor.type).name ||
        <string>sensor.type;
    return sensorTypeRepository.find(sensorTypeId)
    .then(() => sensor);
}

export function addSensor(req: Request, res: Response, next: Next) {
    sensorValidator.validate(req.body, false)
    .then(validateDependencies)
    .then(sensorRepository.create)
    .then(sensor => handleJsonData(req, res, next, sensor))
    .catch(err => handleErrors(next, err));
}

export function updateSensor(req: Request, res: Response, next: Next) {
    req.body.id = req.params.id;
    sensorValidator.validate(req.body)
    .then(validateDependencies)
    .then(sensorRepository.update)
    .then(sensor => handleJsonData(req, res, next, sensor))
    .catch(err => handleErrors(next, err));
}

export function deleteSensor(req: Request, res: Response, next: Next) {
    sensorRepository.remove(req.params.id)
    .then(() => handleJsonData(req, res, next, null))
    .catch(err => handleErrors(next, err));
}

export function fetchSensors(req: Request, res: Response, next: Next) {
    sensorRepository.findAll()
    .then(sensors => handleJsonData(req, res, next, sensors))
    .catch(err => handleErrors(next, err));
}

export function getSensor(req: Request, res: Response, next: Next) {
    sensorRepository.find(req.params.id)
    .then(sensor => handleJsonData(req, res, next, sensor))
    .catch(err => handleErrors(next, err));
}
