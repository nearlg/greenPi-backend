import * as restify from "restify";
import * as Middleware from "../middleware/user";
import * as userValidator from "../validation/user";
import { handleJsonData, handleErrors } from "./helpers";
import { isAuthorized } from "../middleware/authorization";

export function routes(server: restify.Server, mainPath: string = ''): void{

    // User profile

    server.post(mainPath + '/profile/sign-in', isAuthorized, (req, res, next) => {
        const email: string = req.body.email;
        const password: string = req.body.password;
        userValidator.validateEmail(email)
        .then(() => userValidator.validatePassword(password))
        .then(() => Middleware.signIn(email, password))
        .then(token => handleJsonData(token, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/profile', isAuthorized, (req, res, next) => {
        Promise.resolve({data: 'ok'})
        .then(user => handleJsonData(user, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.post(mainPath + '/profile', isAuthorized, (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Middleware.addUser(user))
        .then(user => handleJsonData(user, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/profile', isAuthorized, (req, res, next) => {
        const email: string = req.body.email;
        const password: string = req.body.password;
        userValidator.validateEmail(email)
        .then(() => userValidator.validatePassword(password))
        .then(() => Middleware.signIn(email, password))
        .then(token => handleJsonData(token, res, next))
        .catch(err => handleErrors(err, next));
    });

    // For the Admins

    server.post(mainPath, isAuthorized, (req, res, next) => {
        userValidator.validate(req.body, true, true)
        .then(user => Middleware.addUser(user))
        .then(user => handleJsonData(user, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, isAuthorized, (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Middleware.updateUser(user))
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:email', isAuthorized, (req, res, next) => {
        userValidator.validate(req.body)
        .then(user => Middleware.updateUserByEmail(req.params.email, user))
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, isAuthorized, (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Middleware.deleteUser(user))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:email', isAuthorized, (req, res, next) => {
        Middleware.deleteUserByEmail(req.params.email)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, isAuthorized, (req, res, next) => {
        Middleware.fetchUsers()
        .then(users => handleJsonData(users, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:email', isAuthorized, (req, res, next) => {
        Middleware.getUserByEmail(req.params.email)
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });
}
