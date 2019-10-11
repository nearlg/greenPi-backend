import { ErrorHandler } from './interface/error-handler';
import { Next } from 'restify';
import {  InvalidCredentialsError ,UnauthorizedError, NotAuthorizedError }
    from 'restify-errors';

class AuthErrorHandler implements ErrorHandler {

    handleError(next: Next, err: Error): boolean {
        switch(err.name) {
            // http code: 401
            case 'InvalidCredentialsError':
                this.handleInvalidCredentialsError(next, err);
                return true;
            // Authentication is required
            // or error for the authentication
            // http code: 401
            case 'UnauthorizedError':
                this.handleUnauthorizedError(next, err);
                return true;
            // The user might not have the necessary permissions for a resource
            // http code: 403
            case 'NotAuthorizedError':
                this.handleNotAuthorizedError(next, err);
                return true;
        }
        return false;
    }

    private handleInvalidCredentialsError(next: Next, err: Error) {
        const error = new InvalidCredentialsError(err);
        return next(error);
    }

    private handleUnauthorizedError(next: Next, err: Error) {
        const error = new UnauthorizedError(err);
        return next(error);
    }

    private handleNotAuthorizedError(next: Next, err: Error) {
        const error = new NotAuthorizedError(err);
        return next(error);
    }
}

export const errorHandler = new AuthErrorHandler();
