import { Request, Response, Next } from "restify";
import { userRepository } from "../repositories";
import { createToken } from "../services/jwt.service";
import * as userValidator from "../validation/user";
import {
  verify,
  getAuthUrl,
  getIdToken
} from "../services/google-auth.service";
import { User } from "../models/interface/user";
import { RoleName } from "../models/role-name";
import { handleJsonData, handleErrors } from "./helpers";

async function signInUpGoogle(payload: any) {
  const userId = payload.sub;
  try {
    const user = await userRepository.findByGoogleId(userId);
    return user;
  } catch (err) {
    const newUser = <User>{
      name: payload.name,
      email: payload.email,
      roleName: RoleName.Observer,
      googleId: payload.sub
    };
    const user = await userValidator.validate(newUser, false);
    return userRepository.create(user);
  }
}

export async function authUrl(req: Request, res: Response, next: Next) {
  try {
    const authUrl = await getAuthUrl();
    await handleJsonData(req, res, next, authUrl);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function signInGoogle(req: Request, res: Response, next: Next) {
  try {
    const code: string = req.body.code;
    const idToken = await getIdToken(code);
    const payload = await verify(idToken);
    const user = await signInUpGoogle(payload);
    const token = await createToken(user);
    await handleJsonData(req, res, next, token);
  } catch (err) {
    handleErrors(next, err);
  }
}
