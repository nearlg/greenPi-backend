import * as restify from "restify";
import * as Controller from "../controllers/pump";
import * as pumpValidator from "../validation/pump";
import { handleJsonData, handleErrors } from "./helpers";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.post(mainPath, (req, res, next) => {
        pumpValidator.validate(req.body)
        .then(pump => Controller.addPump(pump))
        .then(pump => handleJsonData(pump, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next) => {
        pumpValidator.validate(req.body, true)
        .then(pump => Controller.updatePump(pump))
        .then(pump => handleJsonData(pump, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', (req, res, next) => {
        pumpValidator.validate(req.body)
        .then(pump => Controller.updatePumpById(req.params.id, pump))
        .then(pump => handleJsonData(pump, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next) => {
        pumpValidator.validate(req.body, true)
        .then(pump => Controller.deletePump(pump))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', (req, res, next) => {
        Controller.deletePumpById(req.params.id)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next) => {
        Controller.fetchPumps()
        .then(pumps => handleJsonData(pumps, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id',  (req, res, next) => {
        Controller.getPumpById(req.params.id)
        .then(pump => handleJsonData(pump, res, next))
        .catch(err => handleErrors(err, next));
    });
}
