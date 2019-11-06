import { GraphqlContext } from "../../../graphql-context";

export interface GoogleResolver {
  authUrl(args: {}, context: GraphqlContext): Promise<string>;
  signInGoogle(args: { code: any }, context: GraphqlContext): Promise<string>;
}
