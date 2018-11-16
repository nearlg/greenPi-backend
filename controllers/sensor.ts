import { Request, Response, Next } from 'restify';
import { handleJsonData, handleErrors } from './helpers';
import { ISensor } from '../models/interface/sensor';
import * as sensorValidator from '../validation/sensor';
import { sensorRepository } from '../models/database/repository/implementation/mongoose4/sensor-repository'
import { sensorTypeRepository } from '../models/database/repository/implementation/mongoose4/sensor-type-repository'
import { ISensorType } from '../models/interface/sensor-type';

function validateDependencies(sensor: ISensor): Promise<ISensor> {
    const sensorTypeId: string = (<ISensorType>sensor.type).name ||
        <string>sensor.type;
    return sensorTypeRepository.find(sensorTypeId)
    .then(() => sensor);
}

export function addSensor(req: Request, res: Response, next: Next) {
    sensorValidator.validate(req.body)
    .then(validateDependencies)
    .then(sensorRepository.create)
    .then(sensor => handleJsonData(req, res, next, sensor))
    .catch(err => handleErrors(err, next));
}

export function updateSensor(req: Request, res: Response, next: Next) {
    req.body.id = req.params.id;
    sensorValidator.validate(req.body, true)
    .then(validateDependencies)
    .then(sensorRepository.update)
    .then(sensor => handleJsonData(req, res, next, sensor))
    .catch(err => handleErrors(err, next));
}

export function deleteSensor(req: Request, res: Response, next: Next) {
    sensorRepository.remove(req.params.id)
    .then(() => handleJsonData(req, res, next, null))
    .catch(err => handleErrors(err, next));
}

export function fetchSensors(req: Request, res: Response, next: Next) {
    sensorRepository.findAll()
    .then(sensors => handleJsonData(req, res, next, sensors))
    .catch(err => handleErrors(err, next));
}

export function getSensor(req: Request, res: Response, next: Next) {
    sensorRepository.find(req.params.id)
    .then(sensor => handleJsonData(req, res, next, sensor))
    .catch(err => handleErrors(err, next));
}
