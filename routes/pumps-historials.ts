import * as restify from "restify";
import * as Middleware from "../middleware/pump-historial";
import * as pumpHistorialValidator from "../validation/pump-historial";
import * as pumpValidator from "../validation/pump";
import { handleJsonData, handleErrors, checkQuery } from "../routes/helpers";
import { IPumpHistorial } from "../models/interface/pump-historial";

export function routes(server: restify.Server, mainPath: string = ''): void {

    const commonQuery: string[] = ['gte', 'lte', 'sortBy'];

    function byEnvironmentId(req: restify.Request, res: restify.Response,
    next: restify.Next): Promise<IPumpHistorial[]> {
        let commQuery: string[] = commonQuery;
        commQuery.push('byEnvironmentId');
        return checkQuery(commQuery, req.query)
        .then(() => {
            let gte: Date = new Date(req.query.gte);
            let lte: Date = new Date(req.query.lte);
            let sortBy: string = req.query.sortBy;
            let environmentId: string = req.query.byEnvironmentId;
            return Middleware
                .fetchByEnvironmentId(environmentId, gte, lte, sortBy);
        });
    }

    function byPumpId(req: restify.Request, res: restify.Response,
    next: restify.Next): Promise<IPumpHistorial[]> {
        let commQuery: string[] = commonQuery;
        commQuery.push('byPumpId');
        return checkQuery(commQuery, req.query)
        .then(() => {
            let gte: Date = new Date(req.query.gte);
            let lte: Date = new Date(req.query.lte);
            let sortBy: string = req.query.sortBy;
            let pumpId: string = req.query.byPumpId;
            return Middleware.fetchByPumpId(pumpId, gte, lte, sortBy);
        });
    }

    function byPump(req: restify.Request, res: restify.Response,
    next: restify.Next): Promise<IPumpHistorial[]> {
        let commQuery: string[] = commonQuery;
        commQuery.push('byPump');
        return checkQuery(commQuery, req.query)
        .then(() => {
            let gte: Date = new Date(req.query.gte);
            let lte: Date = new Date(req.query.lte);
            let sortBy: string = req.query.sortBy;
            return pumpValidator.validate(req.query.pump, true)
            .then(pump => Middleware.fetchByPump(pump, gte, lte, sortBy));
        });
    }
    //TODO

    server.get(mainPath + '/', (req, res, next) => {
        let queryResult: Promise<IPumpHistorial[]> = null;

        if(req.query.byEnvironmentId){
            queryResult = byEnvironmentId(req, res, next);
        } else if(req.query.byPumpId){
            queryResult = byPumpId(req, res, next);
        } else {
            queryResult = byPump(req, res, next);
        }
        queryResult.then(pumpHistorial => handleJsonData(pumpHistorial, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.post(mainPath, (req, res, next) => {
        pumpHistorialValidator.validate(req.body)
        .then(pumpHistorial => Middleware.addPumpHistorial(pumpHistorial))
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next)=>{
        pumpHistorialValidator.validate(req.body, true)
        .then(pumpHistorial => Middleware.updatePumpHistorial(pumpHistorial))
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', (req, res, next)=>{
        pumpHistorialValidator.validate(req.body)
        .then(pumpHistorial => Middleware.updatePumpHistorialById(req.params.id, pumpHistorial))
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next)=>{
        pumpHistorialValidator.validate(req.body, true)
        .then(pumpHistorial => Middleware.deletePumpHistorial(pumpHistorial))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', (req, res, next)=>{
        Middleware.deletePumpHistorialById(req.params.id)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next)=>{
        Middleware.fetchPumpHistorials()
        .then(pumpHistorials => handleJsonData(pumpHistorials, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id', (req, res, next)=>{
        Middleware.getPumpHistorialById(req.params.id)
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next))
        .catch(err => handleErrors(err, next));
    });
}
