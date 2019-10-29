import { GoogleResolver } from "./google-resolver";
import {
  getAuthUrl,
  getIdToken,
  verify
} from "../../../../services/google-auth.service";
import { signInUpGoogle } from "./helpers";
import { createToken } from "../../../../services/jwt.service";

const resolver: GoogleResolver = {
  async authUrl(args, req) {
    const authUrl = await getAuthUrl();
    return authUrl;
  },
  async signInGoogle(args, req) {
    const code: string = args.code;
    const idToken = await getIdToken(code);
    const payload = await verify(idToken);
    const user = await signInUpGoogle(payload);
    const token = await createToken(user);
    return token;
  }
};

export default resolver;
