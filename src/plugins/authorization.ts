import { Request, Next, Response } from "restify";
import { verifyTokenFromRequest } from "../services/jwt.service";
import { handleErrors } from "../controllers/helpers";
import { RoleName } from "../services/authz.service/role-name";
import { authzService } from "../services/authz.service";
import { userRepository } from "../repositories";
import { AuthErrorName } from "../lib/errors/auth-error/auth-error-name";

/**
 * Get the role name depending on the authorization header key
 * If authorization header key exist, get the role name from the user
 * If authorization header key does not exist, the role name is 'NonRegistered'
 * @param req
 */
async function getRoleNameByRequest(req: Request) {
  const isAuthorization = req.headers.authorization ? true : false;
  if (!isAuthorization) {
    return RoleName.NonRegistered;
  }
  const validToken = verifyTokenFromRequest(req);
  const userId = validToken["sub"];
  const roleName = await userRepository.getRoleName(userId);
  return roleName;
}

/**
 * Check if the user role can have access to the path
 * @param req
 * @param token
 */
async function requestIsAuthorized(req: Request) {
  const method = req.method;
  const path = req.getRoute().path.toString();
  // Get the role name depending on the authorization header key
  const roleName = await getRoleNameByRequest(req);
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
    await requestIsAuthorized(req);
    next();
  } catch (err) {
    handleErrors(next, err);
  }
}
