import { ErrorHandler } from "./interface/error-handler";
import { MongoError } from "mongodb";
import { ValidationError, CastError } from "mongoose";
import { Next } from "restify";
import { BadRequestError, InvalidArgumentError } from "restify-errors";
import { MongooseErrorName } from "../../lib/errors/mongoose-error";

class MongooseErrorHandler implements ErrorHandler {
  canBeHandled(err: Error) {
    return err.name in MongooseErrorName;
  }

  handleError(next: Next, err: Error) {
    switch (err.name) {
      case MongooseErrorName.ValidationError:
        this.handleValidationError(next, err);
        break;
      case MongooseErrorName.CastError:
        this.handleCastError(next, err);
        break;
      case MongooseErrorName.MongoError:
        this.handleMongoError(next, err);
    }
  }

  private handleValidationError(next: Next, err: Error) {
    const validationError: ValidationError = <ValidationError>err;
    const error: BadRequestError = new BadRequestError(validationError);
    return next(error);
  }

  private handleCastError(next: Next, err: Error) {
    const castError: CastError = <CastError>err;
    const error: BadRequestError = new BadRequestError(castError);
    return next(error);
  }

  private handleMongoError(next: Next, err: Error) {
    const mongoError: MongoError = <MongoError>err;
    switch (mongoError.code) {
      case 11000:
        return this.handleMongoDuplicateValidationError(next, mongoError);
      default:
        return next(mongoError);
    }
  }

  private handleMongoDuplicateValidationError(next: Next, err: Error) {
    const mongoError: MongoError = <MongoError>err;
    const error: InvalidArgumentError = new InvalidArgumentError(mongoError);
    return next(error);
  }
}

export const errorHandler: MongooseErrorHandler = new MongooseErrorHandler();
