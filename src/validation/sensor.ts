import { Sensor } from "../models/interface/sensor";
import { SensorType } from "../models/interface/sensor-type";
import * as sensorRegex from "./rules/sensor";
import { regexValidation, createError, rejectIfNull } from "./helpers";
import { validateId as sensorTypeIdValidator } from "./sensor-type";

export function validateName(name: string) {
  return regexValidation(
    name,
    sensorRegex.NameRegex,
    "The sensor must have a valid name"
  );
}

export async function validateDescription(description: string) {
  if (!description) {
    return;
  }
  return regexValidation(
    description,
    sensorRegex.DescriptionRegex,
    "The sensor must have a valid description"
  );
}

export async function validatePorts(ports: number[]) {
  if (ports.every(port => sensorRegex.ConnectionPortRegex.test(port + ""))) {
    return ports;
  }
  const err = createError("The sensor must have valid port numbers");
  throw err;
}

export async function validateType(sensorType: SensorType | string) {
  if (!sensorType) {
    const err = createError("The sensor must have a valid sensor type");
    throw err;
  }
  if ("object" === typeof sensorType) {
    return sensorType;
  }
  return sensorTypeIdValidator(sensorType);
}

export async function validateId(id: string) {
  if (!id || !sensorRegex.IdRegex.test(id)) {
    const err = createError("Invalid sensor id");
    throw err;
  }
  return id;
}

export async function validate(sensor: Sensor, checkId: boolean = true) {
  try {
    await rejectIfNull(sensor, "Sensor is null or undefined");
    await validateName(sensor.name);
    await validateDescription(sensor.description);
    await validatePorts(sensor.connectionPorts);
    await validateType(sensor.type);
    if (checkId) {
      await validateId(sensor.id);
    }
  } catch (err) {
    err.message = "Invalid sensor: " + err.message;
    throw err;
  }
  return sensor;
}
