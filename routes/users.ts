import * as restify from "restify";
import * as Middleware from "../middleware/user";
import * as userValidator from "../validation/user";
import { handleJsonData, handleErrors } from "./helpers";

export function routes(server: restify.Server, mainPath: string = ''): void{

    server.post(mainPath, (req, res, next)=>{
        userValidator.validate(req.body, true)
        .then(user => Middleware.addUser(user))
        .then(user => handleJsonData(user, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next)=>{
        userValidator.validate(req.body, true)
        .then(user => Middleware.updateUser(user))
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:email', (req, res, next)=>{
        userValidator.validate(req.body)
        .then(user => Middleware.updateUserByEmail(req.params.email, user))
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next)=>{
        userValidator.validate(req.body, true)
        .then(user => Middleware.deleteUser(user))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:email', (req, res, next)=>{
        Middleware.deleteUserByEmail(req.params.email)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next)=>{
        Middleware.fetchUsers()
        .then(users => handleJsonData(users, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:email', (req, res, next)=>{
        Middleware.getUserByEmail(req.params.id)
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });
}
