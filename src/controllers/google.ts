import { Request, Response, Next } from 'restify';
import { userRepository } from '../repositories';
import { createToken } from '../services/jwt.service';
import * as userValidator from '../validation/user';
import { verify, getAuthUrl, getIdToken } from '../services/google-auth.service';
import { User } from '../models/interface/user';
import { RoleName } from '../services/authz.service/role-name';
import { handleJsonData, handleErrors } from './helpers';

export function authUrl(req: Request, res: Response, next: Next) {
    getAuthUrl()
    .then(authUrl => handleJsonData(req, res, next, authUrl))
    .catch(err => handleErrors(next, err));
}

export function signInGoogle(req: Request, res: Response, next: Next) {
    const code: string = req.body.code;
    getIdToken(code)
    .then(token => {
        return verify(token)}
    )
    .then(payload => {
        const userId = payload.sub;
        return userRepository.findByGoogleId(userId)
        .catch(() => {
            const newUser = <User>{
                name: payload.name,
                email: payload.email,
                roleName: RoleName.Observer,
                googleId: payload.sub
            };
            return userValidator.validate(newUser, false)
            .then(userRepository.create);
        });
    })
    .then(user => {
        const token = createToken(user);
        return Promise.resolve(token);
    })
    .then(token => handleJsonData(req, res, next, token))
    .catch(err => handleErrors(next, err));
}
