import { Request, Next, Response} from 'restify';
import { verifyTokenFromRequest } from '../services/jwt-service';
import { handleErrors } from '../controllers/helpers';
import { RoleName } from '../services/authz-service/role-name';
import { authzService } from '../services/authz-service';
import { userRepository } from '../models/database/repository/implementation/mongoose4/user-repository';

/**
 * Check if the user role can have access to the path
 * @param req
 * @param token
 */
function requestIsAuthorized(req: Request)
: Promise<void> {
    const method = req.method;
    const path = req.getRoute().path.toString();
    return Promise.resolve(!req.headers.authorization)
    // Get the role name depending on the authorization header key
    // If authorization header key exist, get the role name from the user
    // If authorization header key does not exist, the role name is 'NonRegistered'
    .then(noAuthorization => {
        return noAuthorization ? RoleName.NonRegistered :
        verifyTokenFromRequest(req)
        .then(validToken => validToken.sub)
        .then(userRepository.getRoleName);
    })
    // If the rolename is NOT authorize for the giving path and method,
    // It creates an error
    .then(roleName => authzService.isAuthorized(roleName, path, method))
    .then(isAuthorized => {
        if(!isAuthorized) {
            const err = new Error();
            err.name = !req.headers.authorization ?
            'UnauthorizedError' : 'NotAuthorizedError';
            return Promise.reject(err);
        }
    });
}

export function requestAuthz(req: Request,
res: Response, next: Next) {
    requestIsAuthorized(req)
    .then(() => next())
    .catch(err => handleErrors(err, next));
}
