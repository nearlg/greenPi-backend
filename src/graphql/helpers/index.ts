import { GraphQLError } from "graphql/error/GraphQLError";
import { ErrorBuilders } from "../../lib/errors/error-builders";
import genericErrorBuilder from "../../lib/errors/generic-error/generic-error-builder";
import { GraphqlCustomError } from "./graphql-custom-error";

export function customFormatErrorFn(err: GraphQLError) {
  if (!err.originalError) {
    return err;
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
