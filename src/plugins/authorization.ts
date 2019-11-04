import { Request, Next, Response } from "restify";
import { getAuthenticationField } from "../services/auth.service";
import { handleErrors } from "../services/restify-error-handler";
import { authzService } from "../services/authz.service";
import { AuthErrorName } from "../lib/errors/auth-error/auth-error-name";

/**
 * Throw an error if the user role can have access to the path
 * @param req
 * @param token
 */
async function rejectIfNotAuthorized(req: Request) {
  const method = req.method;
  const path = req.getRoute().path.toString();
  // Get the role name depending on the authorization request field
  const authentication = getAuthenticationField(req);
  const roleName = authentication.roleName;
  // If the rolename is NOT authorize for the giving path and method,
  // It creates an error
  const isAuthorized = await authzService.isAuthorized(roleName, path, method);
  if (!isAuthorized) {
    const err = new Error();
    err.name = !req.headers.authorization
      ? AuthErrorName.UnauthorizedError
      : AuthErrorName.NotAuthorizedError;
    throw err;
  }
}

export async function requestAuthz(req: Request, res: Response, next: Next) {
  try {
    await rejectIfNotAuthorized(req);
    next();
  } catch (err) {
    // TODO: Cambiar esto
    handleErrors(next, err);
  }
}
