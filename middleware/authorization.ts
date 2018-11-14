import * as restify from "restify";
import { verifyToken } from "../services/jwt-service";
import { handleErrors } from "../routes/helpers";
import { RoleName } from "../services/authz-service/role-name";
import { authzService } from "../services/authz-service";
import { userRepository } from "../models/database/repository/implementation/mongoose4/user-repository";

function bearerIsValid(req: restify.Request): Promise<any> {
    const token = req.headers.authorization ?
        req.headers.authorization.split(' ')[1] :
        '';
    return verifyToken(token);
}

/**
 * Check if the user role can have access to the path
 * @param req
 * @param token
 */
function userIsAuthorized(req: restify.Request)
: Promise<void> {
    const path = req.getRoute().path.toString();
    // If there is not Bearer or Authorization
    if (!req.headers.authorization) {
        const roleName = RoleName.NonRegistered;
        return authzService.isAuthorized(path, roleName)
        .then(isAuthorized => {
            if(!isAuthorized) {
                const err = new Error();
                err.name = 'UnauthorizedError';
                return Promise.reject(err);
            }
        });
    }
    // If there is Bearer or Authorization
    return bearerIsValid(req)
    .then(validToken => validToken.sub || validToken)
    .then(userRepository.findByEmail)
    .then(user => authzService.isAuthorized(path, RoleName.Admin)//TODO: reemplace 'RoleName.Admin' by 'user.RoleName'
        .then(isAuthorized => {
            if(!isAuthorized) {
                const err = new Error();
                err.name = 'NotAuthorizedError';
                return Promise.reject(err);
            }
        })
    );
}

export function isAuthorized(req: restify.Request,
res: restify.Response, next: restify.Next) {
    userIsAuthorized(req)
    .then(() => next())
    .catch(err => handleErrors(err, next));
}
