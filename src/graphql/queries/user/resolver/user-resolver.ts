import { Request } from "restify";
import { User } from "../../../../models/entities/user";
import { SignInLocalArgs } from "./args/sign-in-local-args";
import { EditProfileArgs } from "./args/edit-profile-args";
import { AddUserArgs } from "./args/add-user-args";
import { SignUpArgs } from "./args/sign-up-args";
import { UpdateUserArgs } from "./args/update-user-args";
import { Resolver } from "../../../helpers/resolvers";

export interface UserResolver extends Resolver {
  // User profile
  signInLocal(
    args: { credentialsData: SignInLocalArgs },
    req: Request
  ): Promise<string>;
  signUp(args: { userData: SignUpArgs }, req: Request): Promise<User>;
  getProfile(args: {}, req: Request): Promise<User>;
  editProfile(args: { userData: EditProfileArgs }, req: Request): Promise<User>;

  // For the Admins
  addUser(args: { userData: AddUserArgs }, req: Request): Promise<User>;
  updateUser(args: { userData: UpdateUserArgs }, req: Request): Promise<User>;
  deleteUser(args: { id: string }, req: Request): Promise<User>;
  fetchUsers(args: {}, req: Request): Promise<User[]>;
  getUser(args: { id: string }, req: Request): Promise<User>;
}
