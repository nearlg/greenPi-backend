export interface GraphqlCustomError {
  readonly code: string;
  readonly message: string;
  readonly path: (string | number)[];
}
