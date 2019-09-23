import { Environment } from "../models/interface/environment";
import * as environmentRegex from "./rules/environment";
import { regexValidation, createError, rejectIfNull } from "./helpers";
import { Sensor } from "../models/interface/sensor";
import { Pump } from "../models/interface/pump";

export function validateName(name: string) {
  return regexValidation(
    name,
    environmentRegex.NameRegex,
    "The environment must have a valid name"
  );
}

export async function validateDescription(description: string) {
  if (!description) {
    return;
  }
  return regexValidation(
    description,
    environmentRegex.DescriptionRegex,
    "The environment must have a valid description"
  );
}

export async function validateSensors(sensors: (Sensor | string)[]) {
  const types = /^\[object (Array|Null|Undefined)\]$/;
  const type: string = Object.prototype.toString.call(sensors);
  if (!types.test(type)) {
    const err = createError(
      "The environment must have a valid array of sensors"
    );
    throw err;
  }
  return sensors;
}

export async function validatePumps(pumps: (Pump | string)[]) {
  const types = /^\[object (Array|Null|Undefined)\]$/;
  const type: string = Object.prototype.toString.call(pumps);
  if (!types.test(type)) {
    const err = createError("The environment must have a valid array of pumps");
    throw err;
  }
  return pumps;
}

export async function validateId(id: string) {
  if (!id || !environmentRegex.IdRegex.test(id)) {
    const err = createError("Invalid environment id");
    throw err;
  }
  return id;
}

export async function validate(
  environment: Environment,
  checkId: boolean = true
) {
  try {
    await rejectIfNull(environment, "Environment is null or undefined");
    await validateName(environment.name);
    await validateDescription(environment.description);
    await validateSensors(environment.sensors);
    await validatePumps(environment.pumps);
    if (checkId) {
      await validateId(environment.id);
    }
  } catch (err) {
    err.message = "Invalid environment: " + err.message;
    throw err;
  }
  return environment;
}
