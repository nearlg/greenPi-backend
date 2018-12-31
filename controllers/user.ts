import { Request, Response, Next } from 'restify';
import bcrypt = require('bcrypt');
import { handleJsonData, handleErrors } from './helpers';
import * as userValidator from '../validation/user';
import { userRepository } from '../repositories';
import { createToken, verifyTokenFromRequest } from '../services/jwt.service';
import { RoleName } from '../services/authz.service/role-name';

export function addUser(req: Request, res: Response, next: Next) {
    if (req.body) {
        req.body.roleName = RoleName.Observer;
    }
    userValidator.validate(req.body, false)
    .then(userRepository.create)
    .then(user => handleJsonData(req, res, next, user))
    .catch(err => handleErrors(next, err));
}

export function updateUser(req: Request, res: Response, next: Next) {
    req.body.id = req.params.id;
    userValidator.validate(req.body)
    .then(userRepository.update)
    .then(user => handleJsonData(req, res, next, user))
    .catch(err => handleErrors(next, err));
}

export function deleteUser(req: Request, res: Response, next: Next) {
    userRepository.remove(req.params.id)
    .then(user => handleJsonData(req, res, next, user))
    .catch(err => handleErrors(next, err));
}

export function fetchUsers(req: Request, res: Response, next: Next) {
    userRepository.findAll()
    .then(users => handleJsonData(req, res, next, users))
    .catch(err => handleErrors(next, err));
}

export function getUser(req: Request, res: Response, next: Next) {
    userRepository.find(req.params.id)
    .then(user => handleJsonData(req, res, next, user))
    .catch(err => handleErrors(next, err));
}

export function signUp(req: Request, res: Response, next: Next) {
    if (req.body) {
        req.body.roleName = RoleName.Observer;
    }
    userValidator.validate(req.body, false)
    .then(userRepository.create)
    .then(user => handleJsonData(req, res, next, user))
    .catch(err => handleErrors(next, err));
}

export function signInLocal(req: Request, res: Response, next: Next) {
    const email: string = req.body.email;
    const password: string = req.body.password;
    userValidator.validatePassword(password)
    .then(() => userValidator.validateEmail(email))
    .then(userRepository.findByEmail)
    .then(user => {
        return bcrypt.compare(password, user.password)
        .then(passwdIsCorrect => {
            if (passwdIsCorrect) {
                const token = createToken(user);
                return Promise.resolve(token);
            }
            return Promise.reject();
        })
        // With this, the real error is hidden and
        // is more complex to know if the user does not exist
        // or the password was wrong
        .catch(error => {
            const err = new Error();
            err.name = 'InvalidCredentialsError';
            return Promise.reject(err);
        });
    })
    .then(token => handleJsonData(req, res, next, token))
    .catch(err => handleErrors(next, err));
}

export function getProfile(req: Request, res: Response, next: Next) {
    verifyTokenFromRequest(req)
    .then(validToken => userRepository.find(validToken.sub))
    .then(user => handleJsonData(req, res, next, user))
    .catch(err => handleErrors(next, err));
}

export function editProfile(req: Request, res: Response, next: Next) {
    verifyTokenFromRequest(req)
    .then(validToken => userRepository.find(validToken.sub))
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
    .catch(err => handleErrors(next, err));
}
