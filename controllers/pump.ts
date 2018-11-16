import { Request, Response, Next } from "restify";
import * as pumpValidator from "../validation/pump";
import { pumpRepository } from "../models/database/repository/implementation/mongoose4/pump-repository"
import { handleJsonData, handleErrors } from "./helpers";

export function addPump(req: Request, res: Response, next: Next) {
    pumpValidator.validate(req.body)
    .then(pump => pumpRepository.create(pump))
    .then(pump => handleJsonData(req, res, next, pump))
    .catch(err => handleErrors(err, next));
}

export function updatePump(req: Request, res: Response, next: Next) {
    pumpValidator.validate(req.body, true)
    .then(pump => pumpRepository.update(pump))
    .then(pump => handleJsonData(req, res, next, pump))
    .catch(err => handleErrors(err, next));
}

export function updatePumpById(req: Request, res: Response, next: Next) {
    pumpValidator.validate(req.body, true)
    .then(pump => pumpRepository.updateById(req.params.id, pump))
    .then(pump => handleJsonData(req, res, next, pump))
    .catch(err => handleErrors(err, next));
}

export function deletePump(req: Request, res: Response, next: Next) {
    pumpValidator.validate(req.body, true)
    .then(pump => pumpRepository.remove(pump))
    .then(() => handleJsonData(req, res, next, null))
    .catch(err => handleErrors(err, next));
}

export function deletePumpById(req: Request, res: Response, next: Next) {
    pumpRepository.removeById(req.params.id)
    .then(() => handleJsonData(req, res, next, null))
    .catch(err => handleErrors(err, next));
}

export function fetchPumps(req: Request, res: Response, next: Next) {
    pumpRepository.findAll()
    .then(pumps => handleJsonData(req, res, next, pumps))
    .catch(err => handleErrors(err, next));
}

export function getPumpById(req: Request, res: Response, next: Next) {
    pumpRepository.findById(req.params.id)
    .then(pump => handleJsonData(req, res, next, pump))
    .catch(err => handleErrors(err, next));
}
