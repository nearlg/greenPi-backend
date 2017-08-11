import { IErrorHandler } from "./interface/error-handler";
import { Next } from "restify";
import { NotFoundError } from "restify-errors";

class DataErrorHandler implements IErrorHandler {

    handleError(err: Error, next: Next): boolean {
        switch(err.name) {
            case 'DataNotFoundError':
                this.handleDataNotFoundError(err, next);
                return true;
        }
        return false;
    }

    private handleDataNotFoundError(err: Error, next: Next): void {
        let error: NotFoundError = new NotFoundError(err);
        return next(error);
    }
}

export const errorHandler: DataErrorHandler = new DataErrorHandler();