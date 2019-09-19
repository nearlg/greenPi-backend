import { Environment } from "@/models/interface/environment";
import * as environmentRegex from "@/validation/rules/environment";
import {
  regexValidation,
  createError,
  rejectIfNull
} from "@/validation/helpers";
import { Sensor } from "@/models/interface/sensor";
import { Pump } from "@/models/interface/pump";

export function validateName(name: string): Promise<string> {
  return regexValidation(
    name,
    environmentRegex.NameRegex,
    "The environment must have a valid name"
  );
}

export function validateDescription(description: string): Promise<string> {
  if (!description) {
    return Promise.resolve(null);
  }
  return regexValidation(
    description,
    environmentRegex.DescriptionRegex,
    "The environment must have a valid description"
  );
}

export function validateSensors(
  sensors: (Sensor | string)[]
): Promise<(Sensor | string)[]> {
  let types: RegExp = /^\[object (Array|Null|Undefined)\]$/;
  let type: string = Object.prototype.toString.call(sensors);
  if (types.test(type)) {
    return Promise.resolve(sensors);
  }
  let err: Error = createError(
    "The environment must have a valid array of sensors"
  );
  return Promise.reject(err);
}

export function validatePumps(
  pumps: (Pump | string)[]
): Promise<(Pump | string)[]> {
  let types: RegExp = /^\[object (Array|Null|Undefined)\]$/;
  let type: string = Object.prototype.toString.call(pumps);
  if (types.test(type)) {
    return Promise.resolve(pumps);
  }
  let err: Error = createError(
    "The environment must have a valid array of pumps"
  );
  return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
  if (id && environmentRegex.IdRegex.test(id)) {
    return Promise.resolve(id);
  }
  let err: Error = createError("Invalid environment id");
  return Promise.reject(err);
}

export function validate(
  environment: Environment,
  checkId: boolean = true
): Promise<Environment> {
  return rejectIfNull(environment, "Environment is null or undefined")
    .then(() => validateName(environment.name))
    .then(() => validateDescription(environment.description))
    .then(() => validateSensors(environment.sensors))
    .then(() => validatePumps(environment.pumps))
    .then(() => (checkId ? validateId(environment.id) : Promise.resolve(null)))
    .then(() => Promise.resolve(environment))
    .catch(err => {
      err.message = "Invalid environment: " + err.message;
      return Promise.reject(err);
    });
}
