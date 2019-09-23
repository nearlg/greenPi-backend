import { User } from "../models/interface/user";
import * as userRegex from "./rules/user";
import { regexValidation, createError, rejectIfNull } from "./helpers";
import { RoleName } from "../services/authz.service/role-name";

export async function validateId(id: string) {
  if (id && userRegex.IdRegex.test(id)) {
    return id;
  }
  const err = createError("Invalid user id");
  throw err;
}

export function validateName(name: string) {
  return regexValidation(
    name,
    userRegex.NameRegex,
    "The user must have a valid name"
  );
}

export function validateEmail(email: string) {
  return regexValidation(
    email,
    userRegex.EmailRegex,
    "The user must have a valid email"
  );
}

export function validatePassword(password: string) {
  return regexValidation(
    password,
    userRegex.PasswordRegex,
    "The user must have a valid password"
  );
}

export async function validateFacebook(facebookId: string) {
  if (!facebookId) {
    return;
  }
  return regexValidation(
    facebookId,
    userRegex.FacebookIdRegex,
    "The Facebook Id must be a valid Id"
  );
}

export async function validateGoogle(googleId: string) {
  if (!googleId) {
    return;
  }
  return regexValidation(
    googleId,
    userRegex.GoogleIdRegex,
    "The Google Id must be a valid Id"
  );
}

export async function validateRoleName(roleName: RoleName) {
  if (!roleName) {
    const err = createError("The user must have a rol name");
    throw err;
  }
  return roleName;
}

export async function validate(user: User, checkId: boolean = true) {
  try {
    await rejectIfNull(user, "User is null or undefined");
    if (!user.googleId && !user.facebookId) {
      await validatePassword(user.password);
      await validateName(user.name);
      await validateEmail(user.email);
      await validateRoleName(user.roleName);
      await validateFacebook(user.facebookId);
      await validateGoogle(user.googleId);
    }
    if (checkId) {
      await validateId(user.id);
    }
  } catch (err) {
    err.message = "Invalid user: " + err.message;
    throw err;
  }
  return user;
}
