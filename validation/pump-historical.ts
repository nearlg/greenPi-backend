import { IPumpHistorical, State } from '../models/interface/pump-historical';
import { IPump } from '../models/interface/pump';
import { DateRegex, IdRegex } from './rules/common';
import { StateRegex } from './rules/pump-historical';
import { regexValidation, createError, rejectIfNull } from './helpers';
import { validateId as pumpIdValidator } from './pump'

export function validateDate(date: Date): Promise<Date>  {
     let dateString: string = date && typeof date.toISOString === 'function'?
    date.toISOString() : date + '';
    return regexValidation(dateString, DateRegex, 'The pump-historical must have a valid date')
    .then(() => Promise.resolve(date));
}

export function validateState(state: State): Promise<number>  {
    return regexValidation(state, StateRegex, 'The pump-historical must have a valid state');
}

export function validatePump(pump: IPump | string): Promise<IPump | string> {
    if(pump) {
        if('object' === typeof pump){
            return Promise.resolve(pump);
        }
        return pumpIdValidator(pump);
    }
    let err: Error = createError('The pump-historical must have a valid pump');
    return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
    if(id && IdRegex.test(id)) {
        return Promise.resolve(id);
    }
    let err: Error = createError('Invalid pump-historical id');
    return Promise.reject(err)
}

export function validate(pumpHistorical: IPumpHistorical, checkId: boolean = false): Promise<IPumpHistorical> {
    return rejectIfNull(pumpHistorical, 'Pump historical is null or undefined')
    .then(() => validateDate(pumpHistorical.date))
    .then(() => validateState(pumpHistorical.state))
    .then(() => validatePump(pumpHistorical.pump))
    .then(() => checkId? validateId(pumpHistorical.id) : Promise.resolve(null))
    .then(() => Promise.resolve(pumpHistorical))
    .catch(err => {
        err.message = 'Invalid pump historical: ' + err.message;
        return Promise.reject(err);
    });
}
