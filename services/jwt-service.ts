import jwt = require('jsonwebtoken');
import { IUser } from '../models/interface/user';
import { Security } from '../config';

function createToken(user: IUser): string {
    const payload = {
        sub: user.email
    };
    const options: jwt.SignOptions = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, Security.JWT_SECRET, options);
}

function verifyToken(token: string) {
    return new Promise((resolve, reject) => {
        try {
            const decodedToken = jwt.verify(token, Security.JWT_SECRET);
            resolve(decodedToken);
        } catch (err) {
            const error: Error = new Error('Invalid token');
            err.name = 'InvalidCredentialsError';
            reject(error);
        }
    });
}

export {
    createToken,
    decodeToken
};
