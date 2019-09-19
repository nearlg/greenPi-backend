import { Request, Response, Next } from "restify";
import { environmentRepository } from "@/repositories";
import * as environmentValidator from "@/validation/environment";
import { handleJsonData, handleErrors } from "@/controllers/helpers";

export function addEnvironment(req: Request, res: Response, next: Next) {
  environmentValidator
    .validate(req.body, false)
    .then(environmentRepository.create)
    .then(environment => handleJsonData(req, res, next, environment))
    .catch(err => handleErrors(next, err));
}

export function updateEnvironment(req: Request, res: Response, next: Next) {
  req.body.id = req.params.id;
  environmentValidator
    .validate(req.body)
    .then(environmentRepository.update)
    .then(environment => handleJsonData(req, res, next, environment))
    .catch(err => handleErrors(next, err));
}

export function deleteEnvironment(req: Request, res: Response, next: Next) {
  return environmentRepository
    .remove(req.params.id)
    .then(environment => handleJsonData(req, res, next, environment))
    .catch(err => handleErrors(next, err));
}

export function fetchEnvironments(req: Request, res: Response, next: Next) {
  return environmentRepository
    .findAll()
    .then(environments => handleJsonData(req, res, next, environments))
    .catch(err => handleErrors(next, err));
}

export function getEnvironment(req: Request, res: Response, next: Next) {
  return environmentRepository
    .find(req.params.id)
    .then(environment => handleJsonData(req, res, next, environment))
    .catch(err => handleErrors(next, err));
}
