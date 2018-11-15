import * as restify from "restify";
import * as Controller from "../controllers/sensor-type";
import * as sensorTypeValidator from "../validation/sensor-type";
import { handleJsonData, handleErrors } from "./helpers";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.post(mainPath, (req, res, next) => {
        req.body.unit = {
            name: req.body.unitName? req.body.unitName : null,
            description: req.body.unitDescription? req.body.unitDescription : null
        }
        sensorTypeValidator.validate(req.body)
        .then(sensorType => Controller.addSensorType(sensorType))
        .then(sensorTypes => handleJsonData(sensorTypes, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next) => {
        req.body.unit = {
            name: req.body.unitName? req.body.unitName : null,
            description: req.body.unitDescription? req.body.unitDescription : null
        }
        sensorTypeValidator.validate(req.body, true)
        .then(sensorType => Controller.updateSensorType(sensorType))
        .then(sensorTypes => handleJsonData(sensorTypes, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', (req, res, next) => {
        req.body.unit = {
            name: req.body.unitName? req.body.unitName : null,
            description: req.body.unitDescription? req.body.unitDescription : null
        }
        sensorTypeValidator.validate(req.body)
        .then(sensorType => Controller.updateSensorTypeById(req.params.id, sensorType))
        .then(sensorTypes => handleJsonData(sensorTypes, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next) => {
        sensorTypeValidator.validate(req.body, true)
        .then(sensorType => Controller.deleteSensorType(sensorType))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', (req, res, next) => {
        Controller.deleteSensorTypeById(req.params.id)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next) => {
        Controller.fetchSensorTypes()
        .then(sensorTypes => handleJsonData(sensorTypes, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id', (req, res, next) => {
        Controller.getSensorTypeById(req.params.id)
        .then(sensorType => handleJsonData(sensorType, res, next))
        .catch(err => handleErrors(err, next));
    });
}
