import { Next } from 'restify';

export interface ErrorHandler {
    handleError(err: Error, next: Next): boolean;
}
