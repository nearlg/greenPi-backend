import { ISensorType } from "../models/interface/sensor-type";
import { NameRegex, DescriptionRegex, PortRegex, IdRegex } from "./rules/common";
import { UnitNameRegex } from "./rules/sensor-type";
import { regexValidation, createError, rejectIfNull } from "./helpers";
import { IUnit } from "../models/interface/unit";

export function validateName(name: string): Promise<string>  {
    return regexValidation(name, NameRegex, 'The sensor type must have a valid name');
}

export function validateDescription(description: string): Promise<string>  {
    if(!description){
        return Promise.resolve(null);
    }
    return regexValidation(description, DescriptionRegex, 'The sensor type must have a valid description');
}

export function validateUnit(unit: IUnit): Promise<IUnit> {
    if(unit) {
        return regexValidation(unit.name, UnitNameRegex, 'The sensor type must have a valid unit name')
        .then(() => {
            unit.description?
            regexValidation(unit.description, DescriptionRegex, 'The sensor type must have a valid unit description') :
            Promise.resolve(null)
        })
        .then(() => Promise.resolve(unit))
    }
    let err: Error = createError('The sensor type must have an unit: ' + unit);
    return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
    if(id && IdRegex.test(id)) {
        return Promise.resolve(id);
    }
    let err: Error = createError('Invalid sensor type id');
    return Promise.reject(err);
}

export function validate(sensorType: ISensorType, checkId: boolean = false): Promise<ISensorType> {
    return rejectIfNull(sensorType, 'Sensor type is null or undefined')
    .then(() => validateName(sensorType.name))
    .then(()=> validateDescription(sensorType.description))
    .then(()=> validateUnit(sensorType.unit))
    .then(() => checkId? validateId(sensorType.id) : Promise.resolve(null))
    .then(()=> Promise.resolve(sensorType))
    .catch(err => {
        err.message = 'Invalid sensor type: ' + err.message;
        return Promise.reject(err);
    });
}
