import { ErrorHandler } from './interface/error-handler';
import { Next } from 'restify';
import { NotFoundError, BadRequestError } from 'restify-errors';
import { ValidationError } from 'mongoose';

class DataErrorHandler implements ErrorHandler {

    handleError(next: Next, err: Error): boolean {
        switch(err.name) {
            case 'DataNotFoundError':
                this.handleDataNotFoundError(next, err);
                return true;
            case 'DataValidationError':
                this.handleValidationError(next, err);
                return true;
        }
        return false;
    }

    private handleValidationError(next: Next, err: Error) {
        const validationError: ValidationError = <ValidationError>err;
        const error: BadRequestError = new BadRequestError(validationError);
        return next(error);
    }

    private handleDataNotFoundError(next: Next, err: Error) {
        const error: NotFoundError = new NotFoundError(err);
        return next(error);
    }
}

export const errorHandler: DataErrorHandler = new DataErrorHandler();
