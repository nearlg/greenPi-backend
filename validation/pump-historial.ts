import { IPumpHistorial, State } from "../models/interface/pump-historial";
import { IPump } from "../models/interface/pump";
import { DateRegex, IdRegex } from "./rules/common";
import { StateRegex } from "./rules/pump-historial";
import { regexValidation, createError } from "./helpers";
import { validateId as pumpIdValidator } from "./pump"

export function validateDate(date: Date): Promise<Date>  {
     let dateString: string = date && typeof date.toISOString === 'function'?
    date.toISOString() : date + '';
    return regexValidation(dateString, DateRegex, 'The pump-historial must have a valid date')
    .then(() => Promise.resolve(date));
}

export function validateState(state: State): Promise<number>  {
    return regexValidation(state, StateRegex, 'The pump-historial must have a valid state');
}

export function validatePump(pump: IPump | string): Promise<IPump | string> {
    if(pump) {
        if('object' === typeof pump){
            return Promise.resolve(pump);
        }
        return pumpIdValidator(pump);
    }
    let err: Error = createError('The pump-historial must have a valid pump');
    return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
    if(id && IdRegex.test(id)) {
        return Promise.resolve(id);
    }
    let err: Error = createError('Invalid pump-historial id');
    return Promise.reject(err)
}

export function validate(pumpHistorial: IPumpHistorial, checkId: boolean = false): Promise<IPumpHistorial> {
    return validateDate(pumpHistorial.date)
    .then(()=> validateState(pumpHistorial.state))
    .then(()=> validatePump(pumpHistorial.pump))
    .then(() => checkId? validateId(pumpHistorial.id) : Promise.resolve(null))
    .then(()=> Promise.resolve(pumpHistorial))
    .catch(err => {
        err.message = 'Invalid pump historial: ' + err.message;
        return Promise.reject(err);
    });
}
