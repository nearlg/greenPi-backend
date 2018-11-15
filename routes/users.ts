import * as restify from "restify";
import * as Controller from "../controllers/user";
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
        .then(() => Controller.signIn(email, password))
        .then(token => handleJsonData(req, res, next, token))
        .catch(err => handleErrors(err, next));
    });

    server.post(mainPath + '/profile', (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Controller.addUser(user))
        .then(user => handleJsonData(req, res, next, user))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/profile', (req, res, next) => {
        verifyTokenFromRequest(req)
        .then(validToken => userRepository.findByEmail(validToken.sub))
        .then(user => handleJsonData(req, res, next, user))
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
        .then(user => handleJsonData(req, res, next, user))
        .catch(err => handleErrors(err, next));
    });

    // For the Admins

    server.post(mainPath, (req, res, next) => {
        userValidator.validate(req.body, true, true)
        .then(user => Controller.addUser(user))
        .then(user => handleJsonData(req, res, next, user))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath, (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Controller.updateUser(user))
        .then(user => handleJsonData(req, res, next, user))
        .catch(err => handleErrors(err, next));
    });

    server.patch(mainPath + '/:email', (req, res, next) => {
        userValidator.validate(req.body)
        .then(user => Controller.updateUserByEmail(req.params.email, user))
        .then(user => handleJsonData(req, res, next, user))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath, (req, res, next) => {
        userValidator.validate(req.body, true)
        .then(user => Controller.deleteUser(user))
        .then(() => handleJsonData(req, res, next, null))
        .catch(err => handleErrors(err, next));
    });

    server.del(mainPath + '/:email', (req, res, next) => {
        Controller.deleteUserByEmail(req.params.email)
        .then(() => handleJsonData(req, res, next, null))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath, (req, res, next) => {
        Controller.fetchUsers()
        .then(users => handleJsonData(req, res, next, users))
        .catch(err => handleErrors(err, next));
    });

    server.get(mainPath + '/:email', (req, res, next) => {
        Controller.getUserByEmail(req.params.email)
        .then(user => handleJsonData(req, res, next, user))
        .catch(err => handleErrors(err, next));
    });
}
