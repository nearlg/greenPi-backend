import { GraphqlContext } from '../../../graphql-context';
import { SignInResponse } from '../../../../lib/sign-in-response';

export interface GoogleResolver {
  authUrl(args: {}, context: GraphqlContext): Promise<string>;
  signInGoogle(
    args: { code: any },
    context: GraphqlContext
  ): Promise<SignInResponse>;
}
