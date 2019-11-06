import { GraphQLError } from "graphql/error/GraphQLError";
import { buildSchema } from "graphql";
import { GraphqlCustomError } from "./graphql-custom-error";
import { GraphqlCustomErrorName } from "./graphql-custom-error-name";
import buildGraphqlSchema from "./build-graphql-schema";
import { GraphqlQuery } from "./graphql-query";

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
