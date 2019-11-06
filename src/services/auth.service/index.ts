import { Request } from "restify";
import * as bcrypt from "bcrypt";
import { RoleName } from "../../models/role-name";
import { userRepository } from "../../models/repositories";
import { AuthData } from "../../lib/auth-data";
import { AuthErrorName } from "../../lib/errors/auth-error";

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
  const authentication: AuthData = req["authentication"];
  return authentication;
}

export async function checkCredentials(password: string, userPassword: string) {
  try {
    const passwdIsCorrect = await bcrypt.compare(password, userPassword);
    if (!passwdIsCorrect) {
      throw new Error();
    }
  } catch (e) {
    // With this, the real error is hidden and
    // is more complex to know if the user does not exist
    // or the password was wrong
    const err = new Error();
    err.name = AuthErrorName.InvalidCredentialsError;
    throw err;
  }
}
