import { ErrorHandler } from './interface/error-handler';
import { Next } from 'restify';
import {  InvalidCredentialsError ,UnauthorizedError, NotAuthorizedError }
    from 'restify-errors';

class AuthErrorHandler implements ErrorHandler {

    handleError(err: Error, next: Next): boolean {
        switch(err.name) {
            // http code: 401
            case 'InvalidCredentialsError':
                this.handleInvalidCredentialsError(err, next);
                return true;
            // Authentication is required
            // or error for the authentication
            // http code: 401
            case 'UnauthorizedError':
                this.handleUnauthorizedError(err, next);
                return true;
            // The user might not have the necessary permissions for a resource
            // http code: 403
            case 'NotAuthorizedError':
                this.handleNotAuthorizedError(err, next);
                return true;
        }
        return false;
    }

    private handleInvalidCredentialsError(err: Error, next: Next) {
        let error = new InvalidCredentialsError(err);
        return next(error);
    }

    private handleUnauthorizedError(err: Error, next: Next) {
        let error = new UnauthorizedError(err);
        return next(error);
    }

    private handleNotAuthorizedError(err: Error, next: Next) {
        let error = new NotAuthorizedError(err);
        return next(error);
    }
}

export const errorHandler = new AuthErrorHandler();
