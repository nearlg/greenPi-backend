import { IPump } from "../models/interface/pump";
import { NameRegex, DescriptionRegex, PortRegex, IdRegex } from "./rules/common";
import { regexValidation, createError, rejectIfNull } from "./helpers";

export function validateName(name: string): Promise<string>  {
    return regexValidation(name, NameRegex, 'The pump must have a valid name');
}

export function validateDescription(description: string): Promise<string>  {
    if(!description){
        return Promise.resolve(null);
    }
    return regexValidation(description, DescriptionRegex, 'The pump must have a valid description');
}

export function validatePorts(ports: number[]): Promise<number[]> {
    if(ports === null || ports === undefined ||ports.every(port => PortRegex.test(port + ''))) {
        return Promise.resolve(ports);
    }
    let err: Error = createError('The pump must have valid port numbers');
    return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
    if(id && IdRegex.test(id)) {
        return Promise.resolve(id);
    }
    let err: Error = createError('Invalid pump id');
    return Promise.reject(err);
}

export function validate(pump: IPump, checkId: boolean = false): Promise<IPump> {
    return rejectIfNull(pump, 'Pump is null or undefined')
    .then(() => validateName(pump.name))
    .then(() => validateDescription(pump.description))
    .then(() => validatePorts(pump.connectionPorts))
    .then(() => checkId? validateId(pump.id) : Promise.resolve(null))
    .then(() => Promise.resolve(pump))
    .catch(err => {
        err.message = 'Invalid pump: ' + err.message;
        return Promise.reject(err);
    });
}
