import jwt = require('jsonwebtoken');
import { Security } from '../config';
import { Request } from 'restify';
import { isString } from 'util';
import { AuthErrorName } from '../lib/errors/auth-error/auth-error-name';
import { User } from '../interfaces/entities/user';

function createToken(user: User): string {
  const payload = {
    sub: user.id
  };
  const options: jwt.SignOptions = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, Security.JWT_SECRET, options);
}

function verifyEncodedToken(encodedToken: string) {
  if (!encodedToken) {
    const error = new Error();
    error.name = AuthErrorName.UnauthorizedError;
    throw error;
  }
  try {
    const decodedToken = jwt.verify(encodedToken, Security.JWT_SECRET);
    if (isString(decodedToken) || !decodedToken['sub']) {
      throw new Error();
    }
    return decodedToken;
  } catch (err) {
    const error: Error = new Error('Invalid token');
    error.name = AuthErrorName.InvalidCredentialsError;
    throw error;
  }
}

function verifyTokenFromRequest(req: Request) {
  const encodedToken = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';
  const validToken = verifyEncodedToken(encodedToken);
  return validToken;
}

export { createToken, verifyTokenFromRequest };
