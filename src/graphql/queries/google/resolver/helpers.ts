import { userRepository } from "../../../../repositories";
import { User } from "../../../../models/interface/user";
import { RoleName } from "../../../../models/role-name";
import * as userValidator from "../../../../validation/user";

export async function signInUpGoogle(payload: any) {
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
