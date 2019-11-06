import { User } from "../../../../models/entities/user";
import { SignInLocalArgs } from "./args/sign-in-local-args";
import { EditProfileArgs } from "./args/edit-profile-args";
import { AddUserArgs } from "./args/add-user-args";
import { SignUpArgs } from "./args/sign-up-args";
import { UpdateUserArgs } from "./args/update-user-args";
import { Resolver } from "../../../helpers/resolvers";
import { GraphqlContext } from "../../../graphql-context";

export interface UserResolver extends Resolver {
  // User profile
  signInLocal(
    args: { credentialsData: SignInLocalArgs },
    context: GraphqlContext
  ): Promise<string>;
  signUp(
    args: { userData: SignUpArgs },
    context: GraphqlContext
  ): Promise<User>;
  getProfile(args: {}, context: GraphqlContext): Promise<User>;
  editProfile(
    args: { userData: EditProfileArgs },
    context: GraphqlContext
  ): Promise<User>;

  // For the Admins
  addUser(
    args: { userData: AddUserArgs },
    context: GraphqlContext
  ): Promise<User>;
  updateUser(
    args: { userData: UpdateUserArgs },
    context: GraphqlContext
  ): Promise<User>;
  deleteUser(args: { id: string }, context: GraphqlContext): Promise<User>;
  fetchUsers(args: {}, context: GraphqlContext): Promise<User[]>;
  getUser(args: { id: string }, context: GraphqlContext): Promise<User>;
}
