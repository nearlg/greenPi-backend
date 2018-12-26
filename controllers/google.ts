import { Request, Response, Next } from 'restify';
import { userRepository } from '../repositories';
import { createToken } from '../services/jwt.service';
import * as userValidator from '../validation/user';
import { verify } from '../services/google-auth.service';
import { User } from '../models/interface/user';
import { RoleName } from '../services/authz.service/role-name';
import { handleJsonData, handleErrors } from './helpers';

export function signInGoogle(req: Request, res: Response, next: Next) {
    const idToken: string = req.body.idToken;
    verify(idToken)
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
            return userValidator.validate(newUser)
            .then(userRepository.create);
        });
    })
    .then(user => {
        const token = createToken(user);
        return Promise.resolve(token);
    })
    .then(token => handleJsonData(req, res, next, token))
    .catch(err => handleErrors(err, next));
}
