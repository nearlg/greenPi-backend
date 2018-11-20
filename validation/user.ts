import { IUser } from '../models/interface/user';
import * as userRegex from './rules/user';
import { regexValidation, createError, rejectIfNull } from './helpers';
import { FacebookAccount } from '../models/interface/facebook-account';
import { GoogleAccount } from '../models/interface/google-account';
import { RoleName } from '../services/authz-service/role-name';

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

export function validateFacebook(facebookAccount?: FacebookAccount):
Promise<null | FacebookAccount> {
    if (!facebookAccount) {
        return Promise.resolve(null);
    }
    if (!facebookAccount.id) {
        const err: Error = createError('A Facebook account must have an id');
        return Promise.reject(err);
    }
    return regexValidation(facebookAccount.id, userRegex.FacebookIdRegex,
        'The Facebook Id must be a valid Id')
    .then(() => facebookAccount);
}

export function validateGoogle(googleAccount?: GoogleAccount):
Promise<null | GoogleAccount> {
    if (!googleAccount) {
        return Promise.resolve(null);
    }
    if (!googleAccount.id) {
        const err: Error = createError('A Google account must have an id');
        return Promise.reject(err);
    }
    return regexValidation(googleAccount.id, userRegex.GoogleIdRegex,
        'The Google Id must be a valid Id')
    .then(() => googleAccount);
}

export function validateRoleName(roleName: RoleName):
Promise<RoleName> {
    if (roleName) {
        return Promise.resolve(roleName);
    }
    const err: Error = createError('The user must have a rol name');
    return Promise.reject(err);
}

export function validate(user: IUser):
Promise<IUser> {
    return rejectIfNull(user, 'User is null or undefined')
    .then(() => validateName(user.name))
    .then(() => validateEmail(user.email))
    .then(() => validateRoleName(user.roleName))
    .then(() => validateFacebook(user.facebook))
    .then(() => validateGoogle(user.google))
    .then(() => {
        if(user.google || user.facebook) {
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
