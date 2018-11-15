import * as restify from "restify";
import * as Middleware from "../middleware/user";
import * as userValidator from "../validation/user";
import { handleJsonData, handleErrors } from "./helpers";
import { userRepository } from "../models/database/repository/implementation/mongoose4/user-repository";
import { verifyTokenFromRequest } from "../services/jwt-service";

export function routes(server: restify.Server, mainPath: string = ''): void{

    // User profile

    server.post(mainPath + '/profile/sign-in', (req, res, next) => {
        const email: string = req.body.email;
        const password: string = req.body.password;
        userValidator.validateEmail(email)
        .then(() => userValidator.validatePassword(password))
        .then(() => Middleware.signIn(email, password))
        .then(token => handleJsonData(token, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.post(mainPath + '/profile', (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Middleware.addUser(user))
        .then(user => handleJsonData(user, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/profile', (req, res, next) => {
        verifyTokenFromRequest(req)
        .then(validToken => userRepository.findByEmail(validToken.sub))
        .then(user => handleJsonData(user, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/profile', (req, res, next) => {
        verifyTokenFromRequest(req)
        .then(validToken => userRepository.findByEmail(validToken.sub))
        .then(user => {
            const name: string = req.body.name;
            const password: string = req.body.password;
            return userValidator.validateName(name)
            .then(() => userValidator.validatePassword(password))
            .then(() => {
                user.name = name;
                user.password = password;
                return user;
            })
        })
        .then(userRepository.update)
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });

    // For the Admins

    server.post(mainPath, (req, res, next) => {
        userValidator.validate(req.body, true, true)
        .then(user => Middleware.addUser(user))
        .then(user => handleJsonData(user, res, next, 201))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Middleware.updateUser(user))
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:email', (req, res, next) => {
        userValidator.validate(req.body)
        .then(user => Middleware.updateUserByEmail(req.params.email, user))
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Middleware.deleteUser(user))
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:email', (req, res, next) => {
        Middleware.deleteUserByEmail(req.params.email)
        .then(() => handleJsonData(null, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next) => {
        Middleware.fetchUsers()
        .then(users => handleJsonData(users, res, next))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:email', (req, res, next) => {
        Middleware.getUserByEmail(req.params.email)
        .then(user => handleJsonData(user, res, next))
        .catch(err => handleErrors(err, next));
    });
}
