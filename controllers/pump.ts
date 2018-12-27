import { Request, Response, Next } from 'restify';
import * as pumpValidator from '../validation/pump';
import { pumpRepository } from '../repositories';
import { handleJsonData, handleErrors } from './helpers';

export function addPump(req: Request, res: Response, next: Next) {
    pumpValidator.validate(req.body, false)
    .then(pumpRepository.create)
    .then(pump => handleJsonData(req, res, next, pump))
    .catch(err => handleErrors(next, err));
}

export function updatePump(req: Request, res: Response, next: Next) {
    req.body.id = req.params.id;
    pumpValidator.validate(req.body)
    .then(pumpRepository.update)
    .then(pump => handleJsonData(req, res, next, pump))
    .catch(err => handleErrors(next, err));
}

export function deletePump(req: Request, res: Response, next: Next) {
    pumpRepository.remove(req.params.id)
    .then(() => handleJsonData(req, res, next, null))
    .catch(err => handleErrors(next, err));
}

export function fetchPumps(req: Request, res: Response, next: Next) {
    pumpRepository.findAll()
    .then(pumps => handleJsonData(req, res, next, pumps))
    .catch(err => handleErrors(next, err));
}

export function getPump(req: Request, res: Response, next: Next) {
    pumpRepository.find(req.params.id)
    .then(pump => handleJsonData(req, res, next, pump))
    .catch(err => handleErrors(next, err));
}
