export interface ErrorBuilder {
  errorIsRecognized(err: Error): boolean;
  build(err: Error): CustomError;
}
