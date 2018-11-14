import * as restify from "restify";
import * as Middleware from "../middleware/sensor";
import * as sensorValidator from "../validation/sensor";
import { handleJsonData, handleErrors } from "../routes/helpers";
import { isAuthorized } from "../middleware/authorization";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.post(mainPath,  isAuthorized, (req, res, next) => {
        sensorValidator.validate(req.body)
        .then(sensor => Middleware.addSensor(sensor))
        .then(sensor => handleJsonData(sensor, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, isAuthorized, (req, res, next) => {
        sensorValidator.validate(req.body, true)
        .then(sensor => Middleware.updateSensor(sensor))
        .then(sensor => handleJsonData(sensor, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', isAuthorized, (req, res, next) => {
        sensorValidator.validate(req.body)
        .then(sensor => Middleware.updateSensorById(req.params.id, sensor))
        .then(sensor => handleJsonData(sensor, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, isAuthorized, (req, res, next) => {
        sensorValidator.validate(req.body, true)
        .then(sensor => Middleware.deleteSensor(sensor))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', isAuthorized, (req, res, next) => {
        Middleware.deleteSensorById(req.params.id)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, isAuthorized, (req, res, next) => {
        Middleware.fetchSensors()
        .then(sensors => handleJsonData(sensors, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id', isAuthorized, (req, res, next) => {
        Middleware.getSensorById(req.params.id)
        .then(sensor => handleJsonData(sensor, res, next))
        .catch(err => handleErrors(err, next));
    });
}
