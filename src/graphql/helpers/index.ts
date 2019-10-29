import { GraphQLError } from "graphql/error/GraphQLError";
import { buildSchema } from "graphql";
import { ErrorBuilders } from "../../lib/errors/error-builders";
import genericErrorBuilder from "../../lib/errors/generic-error/generic-error-builder";
import { GraphqlCustomError } from "./graphql-custom-error";
import { GraphqlCustomErrorName } from "./graphql-custom-error-name";
import buildGraphqlSchema from "./build-graphql-schema";
import { GraphqlQuery } from "./graphql-query";

export function customFormatErrorFn(err: GraphQLError) {
  if (!err.originalError) {
    const formatError = <GraphqlCustomError>{
      code: GraphqlCustomErrorName,
      message: err.message,
      path: err.path
    };
    return formatError;
  }

  const builder = ErrorBuilders.find(builder => builder.errorIsRecognized(err));
  const customError = builder
    ? builder.build(err.originalError)
    : genericErrorBuilder.build(err.originalError);
  const formatError = <GraphqlCustomError>{
    ...customError,
    path: err.path
  };
  return formatError;
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
