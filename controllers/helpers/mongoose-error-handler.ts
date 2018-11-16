import { IErrorHandler } from './interface/error-handler';
import { MongoError } from 'mongodb';
import { ValidationError, CastError } from 'mongoose';
import { Next } from 'restify';
import { BadRequestError, InvalidArgumentError } from 'restify-errors';

class MongooseErrorHandler implements IErrorHandler {

    handleError(err: Error, next: Next): boolean {
        switch(err.name) {
            case 'ValidationError':
                this.handleValidationError(err, next);
                return true;
            case 'CastError':
                this.handleCastError(err, next);
                return true;
            case 'MongoError':
                this.handleMongoError(err, next);
                return true;
        }
        return false;
    }

    private handleValidationError(err: Error, next: Next): void {
        let validationError: ValidationError = <ValidationError>err;
        let error: BadRequestError = new BadRequestError(validationError);
        return next(error);
    }

    private handleCastError(err: Error, next: Next): void {
        let castError: CastError = <CastError>err;
        let error: BadRequestError = new BadRequestError(castError);
        return next(error);
    }

    private handleMongoError(err: Error, next: Next): void {
        let mongoError: MongoError = <MongoError>err;
        switch (mongoError.code) {
            case 11000:
                return this.handleMongoDuplicateValidationError(mongoError, next);
            default:
                return next(mongoError);
        }
    }

    private handleMongoDuplicateValidationError(err: Error, next: Next): void {
        let mongoError: MongoError = <MongoError>err;
        let error: InvalidArgumentError = new InvalidArgumentError(mongoError);
        return next(error);
    }
}

export const errorHandler: MongooseErrorHandler = new MongooseErrorHandler();
