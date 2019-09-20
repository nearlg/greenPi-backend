import { Next } from 'restify';

export interface ErrorHandler {
    handleError(next: Next, err: Error): boolean;
}
