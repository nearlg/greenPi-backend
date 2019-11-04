import { Next } from "restify";

export interface ErrorHandler {
  canBeHandled(err: Error): boolean;
  handleError(next: Next, err: Error);
}
