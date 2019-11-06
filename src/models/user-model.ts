import { Model } from "./model";
import { RoleName } from "./role-name";
import { userRepository } from "./repositories";
import { rejectIfNotAuthorized } from "./helpers";
import { AuthData } from "../lib/auth-data";
import * as userValidator from "../validation/user";
import { User } from "./entities/user";
import { checkCredentials } from "../services/auth.service";
import { createToken } from "../services/jwt.service";

enum RuleName {
  Add = "user.add",
  Update = "user.update",
  Delete = "user.delete",
  FetchAll = "user.fetchAll",
  Get = "user.get",
  SignUp = "user.signUp",
  SignInLocal = "user.signInLocal",
  GetProfile = "user.getProfile",
  EditProfile = "user.editProfile"
}

export class UserModel implements Model {
  rules: Map<string, Set<RoleName>>;
  authData: AuthData;

  constructor(authData: AuthData) {
    this.authData = authData;
    const roles = [RoleName.Admin, RoleName.NonRegistered, RoleName.Observer];
    this.rules = new Map([
      [RuleName.Add, new Set([RoleName.Admin])],
      [RuleName.Update, new Set([RoleName.Admin])],
      [RuleName.Delete, new Set([RoleName.Admin])],
      [RuleName.FetchAll, new Set([RoleName.Admin])],
      [RuleName.SignUp, new Set([RoleName.NonRegistered])],
      [RuleName.SignInLocal, new Set([RoleName.NonRegistered])],
      [RuleName.GetProfile, new Set(roles)],
      [RuleName.EditProfile, new Set(roles)]
    ]);
  }

  async add(data: User) {
    rejectIfNotAuthorized(this, RuleName.Add);
    data.roleName = RoleName.Observer;
    await userValidator.validate(data, false);
    const doc = await userRepository.create(data);
    return doc;
  }

  async update(data: User) {
    rejectIfNotAuthorized(this, RuleName.Update);
    await userValidator.validate(data);
    const doc = await userRepository.update(data);
    return doc;
  }

  async delete(id: string) {
    rejectIfNotAuthorized(this, RuleName.Delete);
    const doc = await userRepository.remove(id);
    return doc;
  }

  async fetchAll() {
    rejectIfNotAuthorized(this, RuleName.FetchAll);
    const docs = await userRepository.findAll();
    return docs;
  }

  async get(id: string) {
    rejectIfNotAuthorized(this, RuleName.Get);
    const doc = await userRepository.find(id);
    return doc;
  }

  async signUp(data: User) {
    rejectIfNotAuthorized(this, RuleName.SignUp);
    if (data.roleName !== RoleName.Observer) {
      data.roleName = RoleName.Observer;
    }
    await userValidator.validate(data, false);
    const doc = userRepository.create(data);
    return doc;
  }

  async signInLocal(email: string, password: string) {
    rejectIfNotAuthorized(this, RuleName.SignInLocal);
    await userValidator.validatePassword(password);
    await userValidator.validateEmail(email);
    const doc = await userRepository.findByEmail(email);
    await checkCredentials(password, doc.password);
    const token = createToken(doc);
    return token;
  }

  async getProfile() {
    rejectIfNotAuthorized(this, RuleName.GetProfile);
    return this.authData.user;
  }

  async editProfile(name: string, password: string) {
    rejectIfNotAuthorized(this, RuleName.EditProfile);
    await userValidator.validateName(name);
    await userValidator.validatePassword(password);
    this.authData.user.name = name;
    this.authData.user.password = password;
    await userRepository.update(this.authData.user);
    return this.authData.user;
  }
}
