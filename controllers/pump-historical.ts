import { Request, Response, Next } from "restify";
import { handleJsonData, handleErrors, checkQuery } from "./helpers";
import { IPumpHistorical } from "../models/interface/pump-historical";
import { pumpHistoricalRepository } from "../models/database/repository/implementation/mongoose4/pump-historical-repository"
import { environmentRepository } from "../models/database/repository/implementation/mongoose4/environment-repository"
import { IPump } from "../models/interface/pump";
import { pumpRepository } from "../models/database/repository/implementation/mongoose4/pump-repository";
import * as pumpValidator from "../validation/pump";
import * as pumpHistoricalValidator from "../validation/pump-historical";
import { socketIOService } from "../services/socket-io-service";

const commonQuery: string[] = ['gte', 'lte', 'sortBy'];

function validateDependencies(pumpHistorical: IPumpHistorical): Promise<IPumpHistorical> {
    const pumpId: string = (<IPump>pumpHistorical.pump).id ||
        <string>pumpHistorical.pump;
    return pumpRepository.find(pumpId)
    .then(() => pumpHistorical);
}

function byEnvironmentId(req: Request, res: Response, next: Next):
Promise<IPumpHistorical[]> {
    let commQuery: string[] = commonQuery;
    commQuery.push('byEnvironmentId');
    return checkQuery(commQuery, req.query)
    .then(() => {
        let gte = req.query.gte? new Date(req.query.gte) : null;
        let lte = req.query.lte? new Date(req.query.lte) : null;
        let sortBy: string = req.query.sortBy;
        let environmentId: string = req.query.byEnvironmentId;
        return environmentRepository.find(environmentId)
        .then(environment => pumpHistoricalRepository
            .findAllByPumps(<Array<IPump>>environment.pumps, sortBy, gte, lte));
    });
}

function byPumpId(req: Request, res: Response, next: Next):
Promise<IPumpHistorical[]> {
    let commQuery: string[] = commonQuery;
    commQuery.push('byPumpId');
    return checkQuery(commQuery, req.query)
    .then(() => {
        let gte = req.query.gte? new Date(req.query.gte) : null;
        let lte = req.query.lte? new Date(req.query.lte) : null;
        let sortBy: string = req.query.sortBy;
        let pumpId: string = req.query.byPumpId;
        return pumpRepository.find(pumpId)
        .then(() => pumpHistoricalRepository.findAllByPumpId(pumpId, sortBy, gte, lte));
    });
}

function byPump(req: Request, res: Response, next: Next):
Promise<IPumpHistorical[]> {
    let commQuery: string[] = commonQuery;
    commQuery.push('byPump');
    return checkQuery(commQuery, req.query)
    .then(() => {
        let gte = req.query.gte? new Date(req.query.gte) : null;
        let lte = req.query.lte? new Date(req.query.lte) : null;
        let sortBy: string = req.query.sortBy;
        return pumpValidator.validate(req.query.pump, true)
        .then(pump => pumpRepository.find(pump.id)
        .then(() => pumpHistoricalRepository.findAllByPump(pump, sortBy, gte, lte)));
    });
}

export function getPumpHistoricals(req: Request, res: Response, next: Next) {
    let queryResult: Promise<IPumpHistorical[]> = null;
    if(req.query.byEnvironmentId){
        queryResult = byEnvironmentId(req, res, next);
    } else if(req.query.byPumpId){
        queryResult = byPumpId(req, res, next);
    } else {
        queryResult = byPump(req, res, next);
    }
    queryResult.then(pumpHistorical => handleJsonData(req, res, next, pumpHistorical))
    .catch(err => handleErrors(err, next));
}

export function addPumpHistorical(req: Request, res: Response, next: Next) {
    if (!req.body.date) {
        req.body.date = new Date();
    }
    pumpHistoricalValidator.validate(req.body)
    .then(validateDependencies)
    .then(pumpHistoricalRepository.create)
    .then(pumpHistorical => handleJsonData(req, res, next, pumpHistorical))
    .then(socketIOService.pumpsSIOService.emitLastPumpHistorical)
    .catch(err => handleErrors(err, next));
}

export function updatePumpHistorical(req: Request, res: Response, next: Next) {
    req.body.id = req.params.id;
    pumpHistoricalValidator.validate(req.body)
    .then(validateDependencies)
    .then(pumpHistorical => pumpHistoricalRepository.update(pumpHistorical))
    .then(pumpHistorical => handleJsonData(req, res, next, pumpHistorical))
    .catch(err => handleErrors(err, next));
}

export function deletePumpHistorical(req: Request, res: Response, next: Next) {
    return pumpHistoricalRepository.remove(req.params.id)
    .then(() => handleJsonData(req, res, next, null))
    .catch(err => handleErrors(err, next));
}

export function fetchPumpHistoricals(req: Request, res: Response, next: Next) {
    return pumpHistoricalRepository.findAll()
    .then(pumpHistoricals => handleJsonData(req, res, next, pumpHistoricals))
    .catch(err => handleErrors(err, next));
}

export function getPumpHistorical(req: Request, res: Response, next: Next) {
    pumpHistoricalRepository.find(req.params.id)
    .then(pumpHistorical => handleJsonData(req, res, next, pumpHistorical))
    .catch(err => handleErrors(err, next));
}
