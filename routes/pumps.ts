import * as restify from "restify";
import * as Middleware from "../middleware/pump";
import * as pumpValidator from "../validation/pump";
import { handleJsonData, handleErrors } from "../routes/helpers";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.post(mainPath, (req, res, next)=>{
        pumpValidator.validate(req.body)
        .then(pump => Middleware.addPump(pump))
        .then(pump => handleJsonData(pump, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next)=>{
        pumpValidator.validate(req.body, true)
        .then(pump => Middleware.updatePump(pump))
        .then(pump => handleJsonData(pump, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', (req, res, next)=>{
        pumpValidator.validate(req.body)
        .then(pump => Middleware.updatePumpById(req.params.id, pump))
        .then(pump => handleJsonData(pump, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next)=>{
        pumpValidator.validate(req.body, true)
        .then(pump => Middleware.deletePump(pump))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', (req, res, next)=>{
        Middleware.deletePumpById(req.params.id)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next)=>{
        Middleware.fetchPumps()
        .then(pumps => handleJsonData(pumps, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id', (req, res, next)=>{
        Middleware.getPumpById(req.params.id)
        .then(pump => handleJsonData(pump, res, next))
        .catch(err => handleErrors(err, next));
    });
}