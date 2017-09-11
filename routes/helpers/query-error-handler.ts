import { IErrorHandler } from "./interface/error-handler";
import { Next } from "restify";
import { InvalidArgumentError, HttpError, MissingParameterError } from "restify-errors";//TODO find error type for queries

class QueryErrorHandler implements IErrorHandler {

    handleError(err: Error, next: Next): boolean {
        switch(err.name) {
            case 'InvalidArgumentError':
                this.handleQueryError<InvalidArgumentError>(err, next);
                return true;
            case 'MissingParameterError':
                this.handleQueryError<MissingParameterError>(err, next);
                return true;
        }
        return false;
    }

    private handleQueryError<T extends HttpError>(err: Error, next: Next): void {
        let error: T = err as T;
        return next(error);
    }
}

export const errorHandler: QueryErrorHandler = new QueryErrorHandler();