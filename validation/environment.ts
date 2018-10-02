import { IEnvironment } from "../models/interface/environment";
import { NameRegex, DescriptionRegex, IdRegex } from "./rules/common";
import { regexValidation, createError, rejectIfNull } from "./helpers";
import { ISensor } from "../models/interface/sensor";
import { IPump } from "../models/interface/pump";

export function validateName(name: string): Promise<string>  {
    return regexValidation(name, NameRegex, 'The environment must have a valid name');
}

export function validateDescription(description: string): Promise<string>  {
    if(!description){
        return Promise.resolve(null);
    }
    return regexValidation(description, DescriptionRegex, 'The environment must have a valid description');
}

export function validateSensors(sensors: (ISensor|string)[]): Promise<(ISensor|string)[]> {
    let types: RegExp = /^\[object (Array|Null|Undefined)\]$/;
    let type: string = Object.prototype.toString.call( sensors );
    if(types.test(type)){
        return Promise.resolve(sensors);
    }
    let err: Error = createError('The environment must have a valid array of sensors');
    return Promise.reject(err);
}

export function validatePumps(pumps: (IPump|string)[]): Promise<(IPump|string)[]> {
    let types: RegExp = /^\[object (Array|Null|Undefined)\]$/;
    let type: string = Object.prototype.toString.call( pumps );
    if(types.test(type)){
        return Promise.resolve(pumps);
    }
    let err: Error = createError('The environment must have a valid array of pumps');
    return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
    if(id && IdRegex.test(id)) {
        return Promise.resolve(id);
    }
    let err: Error = createError('Invalid environment id');
    return Promise.reject(err);
}

export function validate(environment: IEnvironment, checkId: boolean = false): Promise<IEnvironment> {
    return rejectIfNull(environment, 'Environment is null or undefined')
    .then(() => validateName(environment.name))
    .then(()=> validateDescription(environment.description))
    .then(()=> validateSensors(environment.sensors))
    .then(()=> validatePumps(environment.pumps))
    .then(() => checkId? validateId(environment.id) : Promise.resolve(null))
    .then(()=> Promise.resolve(environment))
    .catch(err => {
        err.message = 'Invalid environment: ' + err.message;
        return Promise.reject(err);
    });
}
