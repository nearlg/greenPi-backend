import { Next, Response, Request } from "restify";
import { ErrorHandler } from "./interface/error-handler";
import { dataHandler } from "./data-handler";
import { InternalServerError } from "restify-errors";

const errorHandlers: ErrorHandler[] = new Array<ErrorHandler>();

export function checkQuery(query: string[], querySended: object) {
  if (!querySended) {
    const error: Error = new Error();
    error.name = "MissingParameterError";
    error.message = "Missing query parameter";
    throw error;
  }
  const element: string = Object.keys(querySended).find(q => {
    return q! in query;
  });
  if (element === undefined) {
    return;
  }
  const error: Error = new Error();
  error.name = "InvalidArgumentError";
  error.message = "Query " + element + " is not valid";
  throw error;
}

export async function handleJsonData<T>(
  req: Request,
  res: Response,
  next: Next,
  data: T
): Promise<T> {
  dataHandler.handleJson(res, next, req.method, data);
  return data;
}

export function handleErrors(next: Next, err: Error) {
  if (!err) {
    return next();
  }
  errorHandlers.forEach(handler => {
    if (handler.handleError(next, err)) {
      return;
    }
  });
  return next(new InternalServerError(err));
}

export function addErrorHandler(handler: ErrorHandler) {
  errorHandlers.push(handler);
}
