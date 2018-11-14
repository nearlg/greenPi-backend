import * as restify from "restify";
import * as Middleware from "../middleware/environment";
import * as environmentValidator from "../validation/environment";
import { handleJsonData, handleErrors } from "../routes/helpers";
import { isAuthorized } from "../middleware/authorization";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.post(mainPath, isAuthorized, (req, res, next) => {
        environmentValidator.validate(req.body)
        .then(environment => Middleware.addEnvironment(environment))
        .then(environment => handleJsonData(environment, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, isAuthorized, (req, res, next) => {
        environmentValidator.validate(req.body, true)
        .then(environment => Middleware.updateEnvironment(environment))
        .then(environment => handleJsonData(environment, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:id', isAuthorized, (req, res, next) => {
        environmentValidator.validate(req.body)
        .then(environment => Middleware.updateEnvironmentById(req.params.id, environment))
        .then(environment => handleJsonData(environment, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, isAuthorized, (req, res, next) => {
        environmentValidator.validate(req.body, true)
        .then(environment => Middleware.deleteEnvironment(environment))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:id', isAuthorized, (req, res, next) => {
        Middleware.deleteEnvironmentById(req.params.id)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, isAuthorized, (req, res, next) => {
        Middleware.fetchEnvironments()
        .then(environments => handleJsonData(environments, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:id', isAuthorized, (req, res, next) => {
        Middleware.getEnvironmentById(req.params.id)
        .then(environment => handleJsonData(environment, res, next))
        .catch(err => handleErrors(err, next));
    });
}
