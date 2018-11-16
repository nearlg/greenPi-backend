import { Next } from "restify";

export interface IErrorHandler {
    handleError(err: Error, next: Next): boolean;
}