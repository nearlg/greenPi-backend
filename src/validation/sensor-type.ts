import { SensorType } from "../models/interface/sensor-type";
import * as sensorTypeRegex from "./rules/sensor-type";
import { regexValidation, createError, rejectIfNull } from "./helpers";
import { Unit } from "../models/interface/unit";

export function validateName(name: string) {
  return regexValidation(
    name,
    sensorTypeRegex.NameRegex,
    "The sensor type must have a valid name"
  );
}

export async function validateDescription(description: string) {
  if (!description) {
    return;
  }
  return regexValidation(
    description,
    sensorTypeRegex.DescriptionRegex,
    "The sensor type must have a valid description"
  );
}

export async function validateUnit(unit: Unit) {
  if (!unit) {
    const err = createError("The sensor type must have an unit: " + unit);
    throw err;
  }
  await regexValidation(
    unit.name,
    sensorTypeRegex.UnitNameRegex,
    "The sensor type must have a valid unit name"
  );
  if (unit.description) {
    await regexValidation(
      unit.description,
      sensorTypeRegex.DescriptionRegex,
      "The sensor type must have a valid unit description"
    );
  }
  return unit;
}

export async function validateId(id: string) {
  if (!id || !sensorTypeRegex.IdRegex.test(id)) {
    const err = createError("Invalid sensor type id");
    throw err;
  }
  return id;
}

export async function validate(
  sensorType: SensorType,
  checkId: boolean = true
) {
  try {
    await rejectIfNull(sensorType, "Sensor type is null or undefined");
    await validateName(sensorType.name);
    await validateDescription(sensorType.description);
    await validateUnit(sensorType.unit);
    if (checkId) {
      await validateId(sensorType.id);
    }
  } catch (err) {
    err.message = "Invalid sensor type: " + err.message;
    throw err;
  }
  return sensorType;
}
