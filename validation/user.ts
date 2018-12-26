import { User } from '../models/interface/user';
import * as userRegex from './rules/user';
import { regexValidation, createError, rejectIfNull } from './helpers';
import { RoleName } from '../services/authz.service/role-name';

export function validateName(name: string): Promise<string>  {
    return regexValidation(name, userRegex.NameRegex, 'The user must have a valid name');
}

export function validateEmail(email: string): Promise<string>  {
    return regexValidation(email, userRegex.EmailRegex,
        'The user must have a valid email');
}

export function validatePassword(password: string): Promise<string>  {
    return regexValidation(password, userRegex.PasswordRegex,
        'The user must have a valid password');
}

export function validateFacebook(facebookId?: string):
Promise<null | string> {
    if (!facebookId) {
        return Promise.resolve(null);
    }
    return regexValidation(facebookId, userRegex.FacebookIdRegex,
        'The Facebook Id must be a valid Id')
    .then(() => facebookId);
}

export function validateGoogle(googleId?: string):
Promise<null | string> {
    if (!googleId) {
        return Promise.resolve(null);
    }
    return regexValidation(googleId, userRegex.GoogleIdRegex,
        'The Google Id must be a valid Id')
    .then(() => googleId);
}

export function validateRoleName(roleName: RoleName):
Promise<RoleName> {
    if (roleName) {
        return Promise.resolve(roleName);
    }
    const err: Error = createError('The user must have a rol name');
    return Promise.reject(err);
}

export function validate(user: User):
Promise<User> {
    return rejectIfNull(user, 'User is null or undefined')
    .then(() => validateName(user.name))
    .then(() => validateEmail(user.email))
    .then(() => validateRoleName(user.roleName))
    .then(() => validateFacebook(user.facebookId))
    .then(() => validateGoogle(user.googleId))
    .then(() => {
        if(user.googleId || user.facebookId) {
            return;
        }
        return validatePassword(user.password);
    })
    .then(() => Promise.resolve(user))
    .catch(err => {
        err.message = 'Invalid user: ' + err.message;
        return Promise.reject(err);
    });
}
