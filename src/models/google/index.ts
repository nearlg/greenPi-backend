import { Model } from '../model';
import { RoleName } from '../../interfaces/entities/role-name';
import { AuthData } from '../../interfaces/auth-data';
import { rejectIfNotAuthorized } from '../../helpers/model';
import { User } from '../../interfaces/entities/user';
import {
  getAuthUrl,
  getIdToken,
  verify
} from '../../services/google-auth.service';
import { signInUpGoogle } from '../../graphql/queries/google/resolver/helpers';
import { createToken } from '../../services/jwt.service';
import * as userValidator from '../../validation/user';
import { userRepository } from '../user/repository';

enum RuleName {
  SignInUp = 'google.signInUp',
  AuthUrl = 'google.authUrl',
  SignIn = 'google.signIn'
}

export class GoogleModel implements Model {
  rules: Map<string, Set<RoleName>>;
  authData: AuthData;

  constructor(authData: AuthData) {
    this.authData = authData;
    this.rules = new Map([
      [RuleName.SignInUp, new Set([RoleName.NonRegistered])],
      [RuleName.SignIn, new Set([RoleName.NonRegistered])],
      [RuleName.AuthUrl, new Set([RoleName.NonRegistered])]
    ]);
  }

  async signInUp(payload: any) {
    rejectIfNotAuthorized(this, RuleName.SignInUp);
    const userId = payload.sub;
    try {
      const doc = await userRepository.findByGoogleId(userId);
      return doc;
    } catch (err) {
      const userData = <User>{
        name: payload.name,
        email: payload.email,
        roleName: RoleName.Observer,
        googleId: payload.sub
      };
      await userValidator.validate(userData, false);
      const doc = userRepository.create(userData);
      return doc;
    }
  }

  async authUrl() {
    rejectIfNotAuthorized(this, RuleName.AuthUrl);
    const authUrl = await getAuthUrl();
    return authUrl;
  }

  async signIn(code: string) {
    rejectIfNotAuthorized(this, RuleName.SignIn);
    const idToken = await getIdToken(code);
    const payload = await verify(idToken);
    const user = await signInUpGoogle(payload);
    const token = await createToken(user);
    return token;
  }
}
