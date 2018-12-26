import { ErrorHandler } from './interface/error-handler';
import { Next } from 'restify';
import { NotFoundError, BadRequestError } from 'restify-errors';
import { ValidationError } from 'mongoose';

class DataErrorHandler implements ErrorHandler {

    handleError(err: Error, next: Next): boolean {
        switch(err.name) {
            case 'DataNotFoundError':
                this.handleDataNotFoundError(err, next);
                return true;
            case 'DataValidationError':
                this.handleValidationError(err, next);
                return true;
        }
        return false;
    }

    private handleValidationError(err: Error, next: Next) {
        let validationError: ValidationError = <ValidationError>err;
        let error: BadRequestError = new BadRequestError(validationError);
        return next(error);
    }

    private handleDataNotFoundError(err: Error, next: Next) {
        let error: NotFoundError = new NotFoundError(err);
        return next(error);
    }
}

export const errorHandler: DataErrorHandler = new DataErrorHandler();
