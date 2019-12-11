import * as userValidator from '../../../../validation/user';
import { userRepository } from '../../../../models/user/repository';
import { User } from '../../../../interfaces/entities/user';
import { RoleName } from '../../../../interfaces/entities/role-name';

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
