import { Request, Response, Next } from "restify";
import { handleJsonData, handleErrors } from "./helpers";
import * as sensorTypeValidator from "../validation/sensor-type";
import { sensorTypeRepository } from "../models/database/repository/implementation/mongoose4/sensor-type-repository"

export function addSensorType(req: Request, res: Response, next: Next) {
    req.body.unit = {
        name: req.body.unitName? req.body.unitName : null,
        description: req.body.unitDescription? req.body.unitDescription : null
    }
    sensorTypeValidator.validate(req.body)
    .then(sensorTypeRepository.create)
    .then(sensorTypes => handleJsonData(req, res, next, sensorTypes))
    .catch(err => handleErrors(err, next));
}

export function updateSensorType(req: Request, res: Response, next: Next) {
    req.body.id = req.params.id;
    req.body.unit = {
        name: req.body.unitName? req.body.unitName : null,
        description: req.body.unitDescription? req.body.unitDescription : null
    }
    sensorTypeValidator.validate(req.body, true)
    .then(sensorTypeRepository.update)
    .then(sensorTypes => handleJsonData(req, res, next, sensorTypes))
    .catch(err => handleErrors(err, next));
}

export function deleteSensorType(req: Request, res: Response, next: Next) {
    sensorTypeRepository.remove(req.params.id)
    .then(() => handleJsonData(req, res, next, null))
    .catch(err => handleErrors(err, next));
}

export function fetchSensorTypes(req: Request, res: Response, next: Next) {
    sensorTypeRepository.findAll()
    .then(sensorTypes => handleJsonData(req, res, next, sensorTypes))
    .catch(err => handleErrors(err, next));
}

export function getSensorType(req: Request, res: Response, next: Next) {
    sensorTypeRepository.find(req.params.id)
    .then(sensorType => handleJsonData(req, res, next, sensorType))
    .catch(err => handleErrors(err, next));
}
