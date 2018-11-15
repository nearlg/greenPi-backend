import * as restify from "restify";
import * as Controller from "../controllers/sensor";
import * as sensorValidator from "../validation/sensor";
import { handleJsonData, handleErrors } from "./helpers";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.post(mainPath, (req, res, next) => {
        sensorValidator.validate(req.body)
        .then(sensor => Controller.addSensor(sensor))
        .then(sensor => handleJsonData(req, res, next, sensor))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next) => {
        sensorValidator.validate(req.body, true)
        .then(sensor => Controller.updateSensor(sensor))
        .then(sensor => handleJsonData(req, res, next, sensor))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', (req, res, next) => {
        sensorValidator.validate(req.body)
        .then(sensor => Controller.updateSensorById(req.params.id, sensor))
        .then(sensor => handleJsonData(req, res, next, sensor))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next) => {
        sensorValidator.validate(req.body, true)
        .then(sensor => Controller.deleteSensor(sensor))
        .then(() => handleJsonData(req, res, next, null))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', (req, res, next) => {
        Controller.deleteSensorById(req.params.id)
        .then(() => handleJsonData(req, res, next, null))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next) => {
        Controller.fetchSensors()
        .then(sensors => handleJsonData(req, res, next, sensors))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id', (req, res, next) => {
        Controller.getSensorById(req.params.id)
        .then(sensor => handleJsonData(req, res, next, sensor))
        .catch(err => handleErrors(err, next));
    });
}
