import { Measure } from "../models/interface/measure";
import * as measureRegex from "./rules/measure";
import { regexValidation, createError, rejectIfNull } from "./helpers";
import { Sensor } from "../models/interface/sensor";
import { validateId as sensorIdValidator } from "./sensor";

export async function validateDate(date: Date) {
  let dateString: string =
    date && typeof date.toISOString === "function"
      ? date.toISOString()
      : date + "";
  await regexValidation(
    dateString,
    measureRegex.DateRegex,
    "The measure must have a valid date"
  );
  return date;
}

export function validateValue(value: number) {
  return regexValidation(
    value,
    measureRegex.ValueRegex,
    "The measure must have a valid value"
  );
}

export async function validateSensor(sensor: Sensor | string) {
  if (!sensor) {
    const err = createError("The measure must have a valid sensor");
    throw err;
  }
  if ("object" === typeof sensor) {
    return sensor;
  }
  return sensorIdValidator(sensor);
}

export async function validateId(id: string) {
  if (!id || !measureRegex.IdRegex.test(id)) {
    const err = createError("Invalid measure id");
    throw err;
  }
  return id;
}

export async function validate(measure: Measure, checkId: boolean = true) {
  try {
    await rejectIfNull(measure, "Measure is null or undefined");
    await validateDate(measure.date);
    await validateValue(measure.value);
    await validateSensor(measure.sensor);
    if (checkId) {
      await validateId(measure.id);
    }
  } catch (err) {
    err.message = "Invalid measure: " + err.message;
    throw err;
  }
  return measure;
}
