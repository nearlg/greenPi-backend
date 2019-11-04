import { Pump } from "../models/entities/pump";
import * as pumpRegex from "./rules/pump";
import { regexValidation, createError, rejectIfNull } from "./helpers";

export function validateName(name: string) {
  return regexValidation(
    name,
    pumpRegex.NameRegex,
    "The pump must have a valid name"
  );
}

export async function validateDescription(description: string) {
  if (!description) {
    return;
  }
  return regexValidation(
    description,
    pumpRegex.DescriptionRegex,
    "The pump must have a valid description"
  );
}

export async function validatePorts(ports: number[]) {
  if (
    ports === null ||
    ports === undefined ||
    ports.every(port => pumpRegex.ConnectionPortRegex.test(port + ""))
  ) {
    return ports;
  }
  const err = createError("The pump must have valid port numbers");
  throw err;
}

export async function validateId(id: string) {
  if (!id || !pumpRegex.IdRegex.test(id)) {
    const err = createError("Invalid pump id");
    throw err;
  }
  return id;
}

export async function validate(pump: Pump, checkId: boolean = true) {
  try {
    await rejectIfNull(pump, "Pump is null or undefined");
    await validateName(pump.name);
    await validateDescription(pump.description);
    await validatePorts(pump.connectionPorts);
    if (checkId) {
      await validateId(pump.id);
    }
  } catch (err) {
    err.message = "Invalid pump: " + err.message;
    throw err;
  }
  return pump;
}
