import { GoogleResolver } from './google-resolver';
import { SignInResponse } from '../../../../lib/sign-in-response';

const resolver: GoogleResolver = {
  async googleAuthUrl(args, context) {
    const authUrl = await context.models.google.authUrl();
    return authUrl;
  },
  async signInGoogle(args, context) {
    const signInResponse = await context.models.google.signIn(args.code);
    return signInResponse;
  }
};

export default resolver;
