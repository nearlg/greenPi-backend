export function regexValidation<T>(param: T, regex: RegExp, errorMsg?: string): Promise<T> {
    let paramType: string = typeof param;
    let err: Error = createError(errorMsg);
    // If the type of param is not a string or number
    // return a reject
    if(!['string', 'number'].find(t => paramType === t)){
        return Promise.reject(err);
    }
    let toTest: string = typeof param === 'string'? param : param+'';
    return regex.test(toTest)? Promise.resolve(param) : Promise.reject(err);
}

export function rejectIfNull(document: any, errorMsg: string) {
    if (!document) {
        let err: Error = createError(errorMsg);
        return Promise.reject(err);
    }
    return Promise.resolve(document);
}

/**
 * returns an error with the name already setted to 'DataValidationError'
 */
export function createError(msg: string): Error {
    let err: Error = new Error(msg);
    err.name = 'DataValidationError';
    return err;
}
