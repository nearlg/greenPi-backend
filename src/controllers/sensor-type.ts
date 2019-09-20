import { Request, Response, Next } from 'restify';
import { handleJsonData, handleErrors } from './helpers';
import * as sensorTypeValidator from '../validation/sensor-type';
import { sensorTypeRepository } from '../repositories';

export function addSensorType(req: Request, res: Response, next: Next) {
    req.body.unit = {
        name: req.body.unitName? req.body.unitName : null,
        description: req.body.unitDescription? req.body.unitDescription : null
    }
    sensorTypeValidator.validate(req.body, false)
    .then(sensorTypeRepository.create)
    .then(sensorTypes => handleJsonData(req, res, next, sensorTypes))
    .catch(err => handleErrors(next, err));
}

export function updateSensorType(req: Request, res: Response, next: Next) {
    req.body.id = req.params.id;
    req.body.unit = {
        name: req.body.unitName? req.body.unitName : null,
        description: req.body.unitDescription? req.body.unitDescription : null
    }
    sensorTypeValidator.validate(req.body)
    .then(sensorTypeRepository.update)
    .then(sensorTypes => handleJsonData(req, res, next, sensorTypes))
    .catch(err => handleErrors(next, err));
}

export function deleteSensorType(req: Request, res: Response, next: Next) {
    sensorTypeRepository.remove(req.params.id)
    .then(sensorType => handleJsonData(req, res, next, sensorType))
    .catch(err => handleErrors(next, err));
}

export function fetchSensorTypes(req: Request, res: Response, next: Next) {
    sensorTypeRepository.findAll()
    .then(sensorTypes => handleJsonData(req, res, next, sensorTypes))
    .catch(err => handleErrors(next, err));
}

export function getSensorType(req: Request, res: Response, next: Next) {
    sensorTypeRepository.find(req.params.id)
    .then(sensorType => handleJsonData(req, res, next, sensorType))
    .catch(err => handleErrors(next, err));
}
