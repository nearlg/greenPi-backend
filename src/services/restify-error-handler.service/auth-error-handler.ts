import { ErrorHandler } from './interface/error-handler';
import { Next } from 'restify';
import {
  InvalidCredentialsError,
  UnauthorizedError,
  NotAuthorizedError
} from 'restify-errors';
import { AuthErrorName } from '../../lib/errors/auth-error/auth-error-name';

class AuthErrorHandler implements ErrorHandler {
  canBeHandled(err: Error) {
    return err.name in AuthErrorName;
  }

  handleError(next: Next, err: Error) {
    switch (err.name) {
      // http code: 401
      case AuthErrorName.InvalidCredentialsError:
        this.handleInvalidCredentialsError(next, err);
        break;
      // Authentication is required
      // or error for the authentication
      // http code: 401
      case AuthErrorName.UnauthorizedError:
        this.handleUnauthorizedError(next, err);
        break;
      // The user might not have the necessary permissions for a resource
      // http code: 403
      case AuthErrorName.NotAuthorizedError:
        this.handleNotAuthorizedError(next, err);
    }
  }

  private handleInvalidCredentialsError(next: Next, err: Error) {
    const error = new InvalidCredentialsError(err);
    return next(error);
  }

  private handleUnauthorizedError(next: Next, err: Error) {
    const error = new UnauthorizedError(err);
    return next(error);
  }

  private handleNotAuthorizedError(next: Next, err: Error) {
    const error = new NotAuthorizedError(err);
    return next(error);
  }
}

export const errorHandler = new AuthErrorHandler();
