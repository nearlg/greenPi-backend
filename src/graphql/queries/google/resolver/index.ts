import { GoogleResolver } from "./google-resolver";

const resolver: GoogleResolver = {
  async authUrl(args, context) {
    const authUrl = await context.models.google.authUrl();
    return authUrl;
  },
  async signInGoogle(args, context) {
    const token = await context.models.google.signIn(args.code);
    return token;
  }
};

export default resolver;
