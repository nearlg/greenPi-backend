import { ErrorHandler } from './interface/error-handler';
import { MongoError } from 'mongodb';
import { ValidationError, CastError } from 'mongoose';
import { Next } from 'restify';
import { BadRequestError, InvalidArgumentError } from 'restify-errors';

class MongooseErrorHandler implements ErrorHandler {

    handleError(next: Next, err: Error): boolean {
        switch(err.name) {
            case 'ValidationError':
                this.handleValidationError(next, err);
                return true;
            case 'CastError':
                this.handleCastError(next, err);
                return true;
            case 'MongoError':
                this.handleMongoError(next, err);
                return true;
        }
        return false;
    }

    private handleValidationError(next: Next, err: Error) {
        let validationError: ValidationError = <ValidationError>err;
        let error: BadRequestError = new BadRequestError(validationError);
        return next(error);
    }

    private handleCastError(next: Next, err: Error) {
        let castError: CastError = <CastError>err;
        let error: BadRequestError = new BadRequestError(castError);
        return next(error);
    }

    private handleMongoError(next: Next, err: Error) {
        let mongoError: MongoError = <MongoError>err;
        switch (mongoError.code) {
            case 11000:
                return this.handleMongoDuplicateValidationError(next, mongoError);
            default:
                return next(mongoError);
        }
    }

    private handleMongoDuplicateValidationError(next: Next, err: Error) {
        let mongoError: MongoError = <MongoError>err;
        let error: InvalidArgumentError = new InvalidArgumentError(mongoError);
        return next(error);
    }
}

export const errorHandler: MongooseErrorHandler = new MongooseErrorHandler();
