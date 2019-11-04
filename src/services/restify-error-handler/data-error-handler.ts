import { ErrorHandler } from "./interface/error-handler";
import { Next } from "restify";
import { NotFoundError, BadRequestError } from "restify-errors";
import { DataErrorName } from "../../lib/errors/data-error";

class DataErrorHandler implements ErrorHandler {
  canBeHandled(err: Error) {
    return err.name in DataErrorName;
  }

  handleError(next: Next, err: Error) {
    switch (err.name) {
      case DataErrorName.DataNotFoundError:
        this.handleDataNotFoundError(next, err);
        break;
      case DataErrorName.DataValidationError:
        this.handleValidationError(next, err);
    }
  }

  private handleValidationError(next: Next, err: Error) {
    const error: BadRequestError = new BadRequestError(err);
    return next(error);
  }

  private handleDataNotFoundError(next: Next, err: Error) {
    const error: NotFoundError = new NotFoundError(err);
    return next(error);
  }
}

export const errorHandler: DataErrorHandler = new DataErrorHandler();
