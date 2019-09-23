import { Request, Response, Next } from "restify";
import bcrypt = require("bcrypt");
import { handleJsonData, handleErrors } from "./helpers";
import * as userValidator from "../validation/user";
import { userRepository } from "../repositories";
import { createToken, verifyTokenFromRequest } from "../services/jwt.service";
import { RoleName } from "../services/authz.service/role-name";
import { User } from "../models/interface/user";

async function checkCredentials(password: string, userPassword: string) {
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
    err.name = "InvalidCredentialsError";
    throw err;
  }
}

export async function addUser(req: Request, res: Response, next: Next) {
  if (req.body) {
    req.body.roleName = RoleName.Observer;
  }
  try {
    const doc = await userValidator.validate(req.body, false);
    const user = await userRepository.create(doc);
    await handleJsonData(req, res, next, user);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function updateUser(req: Request, res: Response, next: Next) {
  req.body.id = req.params.id;
  try {
    const doc = await userValidator.validate(req.body);
    const user = await userRepository.update(doc);
    await handleJsonData(req, res, next, user);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function deleteUser(req: Request, res: Response, next: Next) {
  try {
    const user = await userRepository.remove(req.params.id);
    await handleJsonData(req, res, next, user);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function fetchUsers(req: Request, res: Response, next: Next) {
  try {
    const users = await userRepository.findAll();
    await handleJsonData(req, res, next, users);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function getUser(req: Request, res: Response, next: Next) {
  try {
    const user = await userRepository.find(req.params.id);
    await handleJsonData(req, res, next, user);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function signUp(req: Request, res: Response, next: Next) {
  if (req.body) {
    req.body.roleName = RoleName.Observer;
  }
  try {
    const doc = await userValidator.validate(req.body, false);
    const user = userRepository.create(doc);
    await handleJsonData(req, res, next, user);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function signInLocal(req: Request, res: Response, next: Next) {
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    await userValidator.validatePassword(password);
    await userValidator.validateEmail(email);
    const user = await userRepository.findByEmail(email);
    await checkCredentials(password, user.password);
    const token = createToken(user);
    await handleJsonData(req, res, next, token);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function getProfile(req: Request, res: Response, next: Next) {
  try {
    const validToken: any = await verifyTokenFromRequest(req);
    const user = await userRepository.find(validToken.sub);
    await handleJsonData(req, res, next, user);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function editProfile(req: Request, res: Response, next: Next) {
  try {
    const validToken: any = await verifyTokenFromRequest(req);
    const user = await userRepository.find(validToken.sub);
    const name: string = req.body.name;
    const password: string = req.body.password;
    await userValidator.validateName(name);
    await userValidator.validatePassword(password);
    user.name = name;
    user.password = password;
    await userRepository.update(user);
    await handleJsonData(req, res, next, user);
  } catch (err) {
    handleErrors(next, err);
  }
}
