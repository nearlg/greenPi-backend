import { Request } from "restify";

export interface GoogleResolver {
  authUrl(args: {}, req: Request): Promise<string>;
  signInGoogle(args: { code: any }, req: Request): Promise<string>;
}
