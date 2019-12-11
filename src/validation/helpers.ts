import { DataErrorName } from '../lib/errors/data-error/data-error-name';

export async function regexValidation<T>(
  param: T,
  regex: RegExp,
  errorMsg?: string
) {
  const paramType: string = typeof param;
  const err: Error = createError(errorMsg || 'Error');
  // If the type of param is not a string or number
  // return a reject
  if (!['string', 'number'].find(t => paramType === t)) {
    throw err;
  }
  const toTest: string = typeof param === 'string' ? param : param + '';
  if (!regex.test(toTest)) {
    throw err;
  }
  return param;
}

export async function rejectIfNull(document: any, errorMsg: string) {
  if (!document) {
    const err = createError(errorMsg);
    throw err;
  }
  return document;
}

/**
 * returns an error with the name already setted to 'DataValidationError'
 */
export function createError(msg: string): Error {
  const err: Error = new Error(msg);
  err.name = DataErrorName.DataValidationError;
  return err;
}
