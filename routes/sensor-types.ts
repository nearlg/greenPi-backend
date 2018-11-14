import * as restify from "restify";
import * as Middleware from "../middleware/sensor-type";
import * as sensorTypeValidator from "../validation/sensor-type";
import { ISensorType } from "../models/interface/sensor-type";
import { handleJsonData, handleErrors } from "../routes/helpers";
import { isAuthorized } from "../middleware/authorization";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.post(mainPath, isAuthorized, (req, res, next) => {
        req.body.unit = {
            name: req.body.unitName? req.body.unitName : null,
            description: req.body.unitDescription? req.body.unitDescription : null
        }
        sensorTypeValidator.validate(req.body)
        .then(sensorType => Middleware.addSensorType(sensorType))
        .then(sensorTypes => handleJsonData(sensorTypes, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, isAuthorized, (req, res, next) => {
        req.body.unit = {
            name: req.body.unitName? req.body.unitName : null,
            description: req.body.unitDescription? req.body.unitDescription : null
        }
        sensorTypeValidator.validate(req.body, true)
        .then(sensorType => Middleware.updateSensorType(sensorType))
        .then(sensorTypes => handleJsonData(sensorTypes, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', isAuthorized, (req, res, next) => {
        req.body.unit = {
            name: req.body.unitName? req.body.unitName : null,
            description: req.body.unitDescription? req.body.unitDescription : null
        }
        sensorTypeValidator.validate(req.body)
        .then(sensorType => Middleware.updateSensorTypeById(req.params.id, sensorType))
        .then(sensorTypes => handleJsonData(sensorTypes, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, isAuthorized, (req, res, next) => {
        sensorTypeValidator.validate(req.body, true)
        .then(sensorType => Middleware.deleteSensorType(sensorType))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', isAuthorized, (req, res, next) => {
        Middleware.deleteSensorTypeById(req.params.id)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, isAuthorized, (req, res, next) => {
        Middleware.fetchSensorTypes()
        .then(sensorTypes => handleJsonData(sensorTypes, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id', isAuthorized, (req, res, next) => {
        Middleware.getSensorTypeById(req.params.id)
        .then(sensorType => handleJsonData(sensorType, res, next))
        .catch(err => handleErrors(err, next));
    });
}
