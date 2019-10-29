export interface GraphqlCustomError extends CustomError {
  readonly path: (string | number)[];
}
