import { userRepository } from "../../../../repositories";
import { UserResolver } from "./user-resolver";
import { RoleName } from "../../../../models/role-name";
import * as userValidator from "../../../../validation/user";
import {
  createToken,
  verifyTokenFromRequest
} from "../../../../services/jwt.service";
import { checkCredentials } from "./helpers";

const resolver: UserResolver = {
  async getUser(args, req) {
    const user = await userRepository.find(args.id);
    return user;
  },
  async signUp(args, req) {
    const roleName = RoleName.Observer;
    const userData = { ...args.userData, roleName };
    const doc = await userValidator.validate(userData, false);
    const user = userRepository.create(doc);
    return user;
  },
  async addUser(args, req) {
    const roleName = RoleName.Observer;
    const userData = { ...args.userData, roleName };
    const doc = await userValidator.validate(userData, false);
    const user = await userRepository.create(doc);
    return user;
  },
  async deleteUser(args, req) {
    const user = await userRepository.remove(args.id);
    return user;
  },
  async editProfile(args, req) {
    const validToken: any = await verifyTokenFromRequest(req);
    const user = await userRepository.find(validToken.sub);
    const name: string = args.userData.name;
    const password: string = args.userData.password;
    await userValidator.validateName(name);
    await userValidator.validatePassword(password);
    user.name = name;
    user.password = password;
    await userRepository.update(user);
    return user;
  },
  async fetchUsers(args, req) {
    const users = await userRepository.findAll();
    return users;
  },
  async getProfile(args, req) {
    const validToken: any = await verifyTokenFromRequest(req);
    const user = await userRepository.find(validToken.sub);
    return user;
  },
  async signInLocal(args, req) {
    const email: string = args.credentialsData.email;
    const password: string = args.credentialsData.password;
    await userValidator.validatePassword(password);
    await userValidator.validateEmail(email);
    const user = await userRepository.findByEmail(email);
    await checkCredentials(password, user.password);
    const token = createToken(user);
    return token;
  },
  async updateUser(args, req) {
    const doc = await userValidator.validate(args.userData);
    const user = await userRepository.update(doc);
    return user;
  }
};

export default resolver;
