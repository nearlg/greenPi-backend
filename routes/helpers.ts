import { Next, Response } from "restify";
import { IErrorHandler } from "./helpers/interface/error-handler";
import { dataHandler } from "./helpers/data-handler";
import { InternalServerError } from "restify-errors";

let errorHandlers: IErrorHandler[] = new Array<IErrorHandler>();

export function checkQuery(query: string[], querySended: object)
: Promise<void | Error> {
    let error: Error = new Error();
    if(!querySended) {
        error.name = 'MissingParameterError';
        error.message ='Missing query parameter';
        return Promise.reject(error);
    }
    let element: string = Object.keys(querySended).find(q => {
        return q !in query;
    });
    error.name = 'InvalidArgumentError';
    error.message = "Query " + element + " is not valid";
    return element === undefined? Promise.resolve() : Promise.reject(error);
}

export function handleJsonData(data: any, res: Response, next: Next, status?: number): void {
    dataHandler.handleJson(data, res, next, status);
}

export function handleErrors(err: Error, next: Next): void {
    if(!err){
        return next();
    }
    errorHandlers.forEach(handler => {
        if(handler.handleError(err, next)) {
            return;
        }
    });
    return next(new InternalServerError(err));
}

export function addErrorHandler(handler: IErrorHandler): void {
    errorHandlers.push(handler);
}