import { Sensor } from "@/models/interface/sensor";
import { SensorType } from "@/models/interface/sensor-type";
import * as sensorRegex from "@/validation/rules/sensor";
import {
  regexValidation,
  createError,
  rejectIfNull
} from "@/validation/helpers";
import { validateId as sensorTypeIdValidator } from "@/validation/sensor-type";

export function validateName(name: string): Promise<string> {
  return regexValidation(
    name,
    sensorRegex.NameRegex,
    "The sensor must have a valid name"
  );
}

export function validateDescription(description: string): Promise<string> {
  if (!description) {
    return Promise.resolve(null);
  }
  return regexValidation(
    description,
    sensorRegex.DescriptionRegex,
    "The sensor must have a valid description"
  );
}

export function validatePorts(ports: number[]): Promise<number[]> {
  if (ports.every(port => sensorRegex.ConnectionPortRegex.test(port + ""))) {
    return Promise.resolve(ports);
  }
  let err: Error = createError("The sensor must have valid port numbers");
  return Promise.reject(err);
}

export function validateType(
  sensorType: SensorType | string
): Promise<SensorType | string> {
  if (sensorType) {
    if ("object" === typeof sensorType) {
      return Promise.resolve(sensorType);
    }
    return sensorTypeIdValidator(sensorType);
  }
  let err: Error = createError("The sensor must have a valid sensor type");
  return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
  if (id && sensorRegex.IdRegex.test(id)) {
    return Promise.resolve(id);
  }
  let err: Error = createError("Invalid sensor id");
  return Promise.reject(err);
}

export function validate(
  sensor: Sensor,
  checkId: boolean = true
): Promise<Sensor> {
  return rejectIfNull(sensor, "Sensor is null or undefined")
    .then(() => validateName(sensor.name))
    .then(() => validateDescription(sensor.description))
    .then(() => validatePorts(sensor.connectionPorts))
    .then(() => validateType(sensor.type))
    .then(() => (checkId ? validateId(sensor.id) : Promise.resolve(null)))
    .then(() => Promise.resolve(sensor))
    .catch(err => {
      err.message = "Invalid sensor: " + err.message;
      return Promise.reject(err);
    });
}
