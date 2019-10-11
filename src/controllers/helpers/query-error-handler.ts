import { ErrorHandler } from './interface/error-handler';
import { Next } from 'restify';
import { InvalidArgumentError, HttpError, MissingParameterError } from 'restify-errors';//TODO: find error type for queries

class QueryErrorHandler implements ErrorHandler {

    handleError(next: Next, err: Error): boolean {
        switch(err.name) {
            case 'InvalidArgumentError':
                this.handleQueryError<InvalidArgumentError>(next, err);
                return true;
            case 'MissingParameterError':
                this.handleQueryError<MissingParameterError>(next, err);
                return true;
        }
        return false;
    }

    private handleQueryError<T extends HttpError>(next: Next, err: Error) {
        const error: T = err as T;
        return next(error);
    }
}

export const errorHandler: QueryErrorHandler = new QueryErrorHandler();
