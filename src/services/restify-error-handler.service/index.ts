import { Next } from "restify";
import { InternalServerError } from "restify-errors";
import { ErrorHandler } from "./interface/error-handler";
import { errorHandler as mongooseErrorHandler } from "./mongoose-error-handler";
import { errorHandler as dataErrorHandler } from "./data-error-handler";
import { errorHandler as authErrorHandler } from "./auth-error-handler";

const errorHandlers: ErrorHandler[] = [
  mongooseErrorHandler,
  dataErrorHandler,
  authErrorHandler
];

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
