import { UserResolver } from './user-resolver';
import { RoleName } from '../../../../models/role-name';

const resolver: UserResolver = {
  async getUser(args, context) {
    const doc = await context.models.user.get(args.id);
    return doc;
  },
  async signUp(args, context) {
    const roleName = RoleName.Observer;
    const data = { ...args.userData, roleName };
    const doc = context.models.user.signUp(data);
    return doc;
  },
  async addUser(args, context) {
    const roleName = RoleName.Observer;
    const data = { ...args.userData, roleName };
    const doc = await context.models.user.add(data);
    return doc;
  },
  async deleteUser(args, context) {
    const doc = await context.models.user.delete(args.id);
    return doc;
  },
  async editProfile(args, context) {
    const name = args.userData.name;
    const password = args.userData.password;
    const doc = await context.models.user.editProfile(name, password);
    return doc;
  },
  async fetchUsers(args, context) {
    const docs = await context.models.user.fetchAll(args.pagination);
    return docs;
  },
  async getProfile(args, context) {
    const doc = await context.models.user.getProfile();
    return doc;
  },
  async signInLocal(args, context) {
    const signInResponse = await context.models.user.signInLocal(
      args.email,
      args.password
    );
    return signInResponse;
  },
  async updateUser(args, context) {
    const doc = await context.models.user.update(args.userData);
    return doc;
  }
};

export default resolver;
