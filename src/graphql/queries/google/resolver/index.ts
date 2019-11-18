import { GoogleResolver } from './google-resolver';
import { SignInResponse } from '../../../../lib/sign-in-response';

const resolver: GoogleResolver = {
  async authUrl(args, context) {
    const authUrl = await context.models.google.authUrl();
    return authUrl;
  },
  async signInGoogle(args, context) {
    const token = await context.models.google.signIn(args.code);
    const signInResponse: SignInResponse = {
      token
    };
    return signInResponse;
  }
};

export default resolver;
