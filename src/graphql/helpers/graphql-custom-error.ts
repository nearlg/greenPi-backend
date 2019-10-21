export interface GraphqlCustomError extends CustomError {
  path: (string | number)[];
}
