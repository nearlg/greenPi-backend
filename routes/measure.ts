import * as restify from "restify";
import * as Middleware from "../middleware/measure";
import * as measureValidator from "../validation/measure";
import * as sensorValidator from "../validation/sensor";
import { ISensor } from "../models/interface/sensor";
import { IEnvironment } from "../models/interface/environment";
import { handleJsonData, handleErrors } from "../routes/helpers";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.get(mainPath + '/by-environment/:id', (req, res, next)=>{
        let gte: Date = new Date(req.body.gte);
        let lte: Date = new Date(req.body.lte);
        let sortBy: string = req.body.sortBy;
        let environmentId: string = req.params.id;
        Middleware.fetchByEnvironmentId(environmentId, gte, lte, sortBy)
        .then(measure => handleJsonData(measure, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/by-sensor/:id', (req, res, next)=>{
        let gte: Date = new Date(req.body.gte);
        let lte: Date = new Date(req.body.lte);
        let sortBy: string = req.body.sortBy;
        let sensorId: string = req.params.id;
        Middleware.fetchBySensorId(sensorId, gte, lte, sortBy)
        .then(measure => handleJsonData(measure, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/by-sensor', (req, res, next)=>{
        let gte: Date = new Date(req.body.gte);
        let lte: Date = new Date(req.body.lte);
        let sortBy: string = req.body.sortBy;
        sensorValidator.validate(req.body.sensor, true)
        .then(sensor => Middleware.fetchBySensor(sensor, gte, lte, sortBy))
        .then(measure => handleJsonData(measure, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.post(mainPath, (req, res, next)=>{
        measureValidator.validate(req.body)
        .then(measure => Middleware.addMeasure(measure))
        .then(measure => handleJsonData(measure, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next)=>{
        measureValidator.validate(req.body, true)
        .then(measure => Middleware.updateMeasure(measure))
        .then(measure => handleJsonData(measure, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', (req, res, next)=>{
        measureValidator.validate(req.body)
        .then(measure => Middleware.updateMeasureById(req.params.id, measure))
        .then(measure => handleJsonData(measure, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next)=>{
        measureValidator.validate(req.body, true)
        .then(measure => Middleware.deleteMeasure(measure))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', (req, res, next)=>{
        Middleware.deleteMeasureById(req.params.id)
        .then(measure => handleJsonData(measure, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next)=>{
        Middleware.fetchMeasures()
        .then(measures => handleJsonData(measures, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id', (req, res, next)=>{
        Middleware.getMeasureById(req.params.id)
        .then(measure => handleJsonData(measure, res, next))
        .catch(err => handleErrors(err, next));
    });
}