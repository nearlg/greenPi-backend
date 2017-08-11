import { IEnvironment } from "../models/interface/environment";
import { NameRegex, DescriptionRegex, IdRegex } from "./rules/common";
import { regexValidation, createError } from "./helpers";
import { ISensor } from "../models/interface/sensor";
import { IPump } from "../models/interface/pump";

export function validateName(name: string): Promise<string>  {
    return regexValidation(name, NameRegex, 'The environment must have a valid name');
}

export function validateDescription(description: string): Promise<string>  {
    if(!description){
        return Promise.resolve(null);
    }
    return regexValidation(description, DescriptionRegex, 'The enironment must have a valid description');
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

export function validate(enironment: IEnvironment, checkId: boolean = false): Promise<IEnvironment> {
    return validateName(enironment.name)
    .then(()=> validateDescription(enironment.description))
    .then(()=> validateSensors(enironment.sensors))
    .then(()=> validatePumps(enironment.pumps))
    .then(() => checkId? validateId(enironment.id) : Promise.resolve(null))
    .then(()=> Promise.resolve(enironment))
    .catch(err => {
        err.message = 'Invalid enironment: ' + err.message;
        return Promise.reject(err);
    });
}