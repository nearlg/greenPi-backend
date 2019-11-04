import { Request } from "restify";
import { RoleName } from "../../models/role-name";
import { userRepository } from "../../repositories";
import { User } from "../../models/interface/user";

export async function setAuthRequestField(
  req: Request,
  verifyTokenFromRequest: (req: Request) => object
) {
  const isAuthorization = req.headers.authorization ? true : false;
  if (!isAuthorization) {
    req["authentication"] = {
      roleName: RoleName.NonRegistered
    };
    return;
  }
  const validToken = verifyTokenFromRequest(req);
  const userId = validToken["sub"];
  const user = await userRepository.find(userId);
  req["authentication"] = {
    roleName: user.roleName,
    user
  };
}

export function getAuthenticationField(req: Request) {
  if (!req["authentication"]) {
    const err = new Error('Request field "authentication" is missing');
    throw err;
  }
  const authentication: {
    roleName: RoleName;
    user?: User;
  } = req["authentication"];
  return authentication;
}
