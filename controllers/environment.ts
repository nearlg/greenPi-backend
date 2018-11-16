import { Request, Response, Next } from "restify";
import { environmentRepository } from "../models/database/repository/implementation/mongoose4/environment-repository"
import * as environmentValidator from "../validation/environment";
import { handleJsonData, handleErrors } from "./helpers";

function addEnvironment(req: Request, res: Response, next: Next) {
    environmentValidator.validate(req.body)
    .then(environment => environmentRepository.create(environment))
    .then(environment => handleJsonData(req, res, next, environment))
    .catch(err => handleErrors(err, next));
}

function updateEnvironment(req: Request, res: Response, next: Next) {
    environmentValidator.validate(req.body, true)
    .then(environment => environmentRepository.update(environment))
    .then(environment => handleJsonData(req, res, next, environment))
    .catch(err => handleErrors(err, next));
}

function updateEnvironmentById(req: Request, res: Response, next: Next) {
    environmentValidator.validate(req.body)
    .then(environment => environmentRepository.updateById(req.params.id, environment))
    .then(environment => handleJsonData(req, res, next, environment))
    .catch(err => handleErrors(err, next));
}

function deleteEnvironment(req: Request, res: Response, next: Next) {
    environmentValidator.validate(req.body, true)
    .then(environment => environmentRepository.remove(environment))
    .then(() => handleJsonData(null, res, next, req))
    .catch(err => handleErrors(err, next));
}

function deleteEnvironmentById(req: Request, res: Response, next: Next) {
    return environmentRepository.removeById(req.params.id)
    .then(() => handleJsonData(null, res, next, req))
    .catch(err => handleErrors(err, next));
}

function fetchEnvironments(req: Request, res: Response, next: Next) {
    return environmentRepository.findAll()
    .then(environments => handleJsonData(req, res, next, environments))
    .catch(err => handleErrors(err, next));
}

function getEnvironmentById(req: Request, res: Response, next: Next) {
    return environmentRepository.findById(req.params.id)
    .then(environment => handleJsonData(req, res, next, environment))
    .catch(err => handleErrors(err, next));
}

export {
    addEnvironment,
    updateEnvironment,
    updateEnvironmentById,
    deleteEnvironment,
    deleteEnvironmentById,
    fetchEnvironments,
    getEnvironmentById
}
