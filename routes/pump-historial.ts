import * as restify from "restify";
import * as Middleware from "../middleware/pump-historial";
import * as pumpHistorialValidator from "../validation/pump-historial";
import * as pumpValidator from "../validation/pump";
import { IPump } from "../models/interface/pump";
import { IEnvironment } from "../models/interface/environment";
import { handleJsonData, handleErrors } from "../routes/helpers";

export function routes(server: restify.Server, mainPath: string = ''): void{
    server.get(mainPath + '/by-environment/:id', (req, res, next)=>{
        let gte: Date = new Date(req.body.gte);
        let lte: Date = new Date(req.body.lte);
        let sortBy: string = req.body.sortBy;
        let environmentId: string = req.params.id;
        Middleware.fetchByEnvironmentId(environmentId, gte, lte, sortBy)
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/by-pump/:id', (req, res, next)=>{
        let gte: Date = new Date(req.body.gte);
        let lte: Date = new Date(req.body.lte);
        let sortBy: string = req.body.sortBy;
        let pumpId: string = req.params.id;
        Middleware.fetchByPumpId(pumpId, gte, lte, sortBy)
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/by-pump', (req, res, next)=>{
        let gte: Date = new Date(req.body.gte);
        let lte: Date = new Date(req.body.lte);
        let sortBy: string = req.body.sortBy;
        pumpValidator.validate(req.body.pump, true)
        .then(pump => Middleware.fetchByPump(pump, gte, lte, sortBy))
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next))
        .catch(err => handleErrors(err, next));
    });    

    server.post(mainPath, (req, res, next)=>{
        pumpHistorialValidator.validate(req.body)
        .then(pumpHistorial => Middleware.addPumpHistorial(pumpHistorial))
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.put(mainPath, (req, res, next)=>{
        pumpHistorialValidator.validate(req.body, true)
        .then(pumpHistorial => Middleware.updatePumpHistorial(pumpHistorial))
        .then(pumpHistorial => handleJsonData(pumpHistorial, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.put(mainPath + '/:id', (req, res, next)=>{
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