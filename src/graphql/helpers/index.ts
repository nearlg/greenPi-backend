import { GraphQLError } from "graphql/error/GraphQLError";
import { buildSchema } from "graphql";
import { GraphqlCustomError } from "./graphql-custom-error";
import { GraphqlCustomErrorName } from "./graphql-custom-error-name";
import buildGraphqlSchema from "./build-graphql-schema";
import { GraphqlQuery } from "./graphql-query";
import { GraphqlAuthz } from "./graphql-authz";
import { AuthErrorName } from "../../lib/errors/auth-error/auth-error-name";
import { Request } from "restify";
import { getAuthenticationField } from "../../services/auth.service";

export function customFormatErrorFn(err: GraphQLError) {
  if (!err.originalError) {
    const customError = <GraphqlCustomError>{
      code: GraphqlCustomErrorName,
      message: err.message,
      path: err.path
    };
    return customError;
  }
  const customError = <GraphqlCustomError>{
    code: err.originalError.name || GraphqlCustomErrorName,
    message: err.originalError.message,
    path: err.path
  };
  return customError;
}

export function buildSchemas(graphQueries: GraphqlQuery[]) {
  const preGraphqlSchemas: PreGraphqlSchema[] = graphQueries.map(s => s.schema);
  const schemasStr = buildGraphqlSchema(preGraphqlSchemas);
  const schemas = buildSchema(schemasStr);
  return schemas;
}

export function extractResolvers(graphQueries: GraphqlQuery[]) {
  const resolvers = graphQueries
    .map(q => q.resolver)
    .reduce((r1, r2) => ({ ...r1, ...r2 }));
  return resolvers;
}

export async function rejectIfNotAuthorized(
  req: Request,
  authz: GraphqlAuthz,
  functionName: string
) {
  // Get the role name depending on the authorization request field
  const authentication = getAuthenticationField(req);
  const roleName = authentication.roleName;
  if (!authz.isAuthorized(functionName, roleName)) {
    const err = new Error("Query not authorized");
    err.name = AuthErrorName.NotAuthorizedError;
    throw err;
  }
}
