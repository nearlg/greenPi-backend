import { Measure } from "@/models/interface/measure";
import * as measureRegex from "@/validation/rules/measure";
import {
  regexValidation,
  createError,
  rejectIfNull
} from "@/validation/helpers";
import { Sensor } from "@/models/interface/sensor";
import { validateId as sensorIdValidator } from "@/validation/sensor";

export function validateDate(date: Date): Promise<Date> {
  let dateString: string =
    date && typeof date.toISOString === "function"
      ? date.toISOString()
      : date + "";
  return regexValidation(
    dateString,
    measureRegex.DateRegex,
    "The measure must have a valid date"
  ).then(() => Promise.resolve(date));
}

export function validateValue(value: number): Promise<number> {
  return regexValidation(
    value,
    measureRegex.ValueRegex,
    "The measure must have a valid value"
  );
}

export function validateSensor(
  sensor: Sensor | string
): Promise<Sensor | string> {
  if (sensor) {
    if ("object" === typeof sensor) {
      return Promise.resolve(sensor);
    }
    return sensorIdValidator(sensor);
  }
  let err: Error = createError("The measure must have a valid sensor");
  return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
  if (id && measureRegex.IdRegex.test(id)) {
    return Promise.resolve(id);
  }
  let err: Error = createError("Invalid measure id");
  return Promise.reject(err);
}

export function validate(
  measure: Measure,
  checkId: boolean = true
): Promise<Measure> {
  return rejectIfNull(measure, "Measure is null or undefined")
    .then(() => validateDate(measure.date))
    .then(() => validateValue(measure.value))
    .then(() => validateSensor(measure.sensor))
    .then(() => (checkId ? validateId(measure.id) : Promise.resolve(null)))
    .then(() => Promise.resolve(measure))
    .catch(err => {
      err.message = "Invalid measure: " + err.message;
      return Promise.reject(err);
    });
}
