import { ErrorBuilder } from "./error-builder";
import authErrorBuilder from "./auth-error/auth-error-builder";
import dataErrorBuilder from "./data-error/data-error-builder";
import mongooseErrorBuilder from "./mongoose-error/mongoose-error-builder";

export const ErrorBuilders: ErrorBuilder[] = [
  authErrorBuilder,
  dataErrorBuilder,
  mongooseErrorBuilder
];
