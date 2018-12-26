import { Next, Response, Request } from 'restify';
import { ErrorHandler } from './interface/error-handler';
import { dataHandler } from './data-handler';
import { InternalServerError } from 'restify-errors';

let errorHandlers: ErrorHandler[] = new Array<ErrorHandler>();

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
    error.message = 'Query ' + element + ' is not valid';
    return element === undefined? Promise.resolve() : Promise.reject(error);
}

export function handleJsonData<T>(req: Request, res: Response, next: Next,
data: T): Promise<T> {
    dataHandler.handleJson(res, next, req.method, data);
    return Promise.resolve(data);
}

export function handleErrors(err: Error, next: Next) {
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

export function addErrorHandler(handler: ErrorHandler) {
    errorHandlers.push(handler);
}
