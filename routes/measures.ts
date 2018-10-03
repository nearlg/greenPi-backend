import * as restify from "restify";
import * as Middleware from "../middleware/measure";
import * as measureValidator from "../validation/measure";
import * as sensorValidator from "../validation/sensor";
import { handleJsonData, handleErrors, checkQuery } from "../routes/helpers";
import { IMeasure } from "../models/interface/measure";

export function routes(server: restify.Server, mainPath: string = ''): void {

    const commonQuery: string[] = ['gte', 'lte', 'sortBy'];

    function byEnvironmentId(req: restify.Request, res: restify.Response,
        next: restify.Next): Promise<IMeasure[]> {
        let commQuery: string[] = commonQuery;
        commQuery.push('byEnvironmentId');
        return checkQuery(commQuery, req.query)
        .then(() => {
            let gte = req.query.gte? new Date(req.query.gte) : null;
            let lte = req.query.lte? new Date(req.query.lte) : null;
            let sortBy: string = req.query.sortBy;
            let environmentId: string = req.query.byEnvironmentId;
            return Middleware
                .fetchByEnvironmentId(environmentId, sortBy, gte, lte);
        });
    }

    function bySensorId(req: restify.Request, res: restify.Response,
    next: restify.Next): Promise<IMeasure[]> {
        let commQuery: string[] = commonQuery;
        commQuery.push('bySensorId');
        return checkQuery(commQuery, req.query)
        .then(() => {
            let gte = req.query.gte? new Date(req.query.gte) : null;
            let lte = req.query.lte? new Date(req.query.lte) : null;
            let sortBy: string = req.query.sortBy;
            let sensorId: string = req.query.bySensorId;
            return Middleware.fetchBySensorId(sensorId, sortBy, gte, lte);
        });
    }

    function bySensor(req: restify.Request, res: restify.Response,
    next: restify.Next): Promise<IMeasure[]> {
        let commQuery: string[] = commonQuery;
        commQuery.push('bySensor');
        return checkQuery(commQuery, req.query)
        .then(() => {
            let gte = req.query.gte? new Date(req.query.gte) : null;
            let lte = req.query.lte? new Date(req.query.lte) : null;
            let sortBy: string = req.query.sortBy;
            return sensorValidator.validate(req.query.sensor, true)
            .then(sensor => Middleware.fetchBySensor(sensor, sortBy, gte, lte));
        });
    }

    server.get(mainPath + '/', (req, res, next) => {
        let queryResult: Promise<IMeasure[]> = null;

        if(req.query.byEnvironmentId){
            queryResult = byEnvironmentId(req, res, next);
        } else if(req.query.bySensorId){
            queryResult = bySensorId(req, res, next);
        } else {
            queryResult = bySensor(req, res, next);
        }
        queryResult.then(measure => handleJsonData(measure, res, next))
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
