import { Request, Response, Next } from "restify";
import { handleJsonData, handleErrors } from "./helpers";
import { Sensor } from "../models/interface/sensor";
import * as sensorValidator from "../validation/sensor";
import { sensorRepository, sensorTypeRepository } from "../repositories";
import { SensorType } from "../models/interface/sensor-type";

async function validateDependencies(sensor: Sensor): Promise<Sensor> {
  const sensorTypeId: string =
    (<SensorType>sensor.type).name || <string>sensor.type;
  await sensorTypeRepository.find(sensorTypeId);
  return sensor;
}

export async function addSensor(req: Request, res: Response, next: Next) {
  try {
    const doc = await sensorValidator.validate(req.body, false);
    await validateDependencies(doc);
    const sensor = await sensorRepository.create(doc);
    await handleJsonData(req, res, next, sensor);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function updateSensor(req: Request, res: Response, next: Next) {
  req.body.id = req.params.id;
  try {
    const doc = await sensorValidator.validate(req.body);
    await validateDependencies(doc);
    const sensor = await sensorRepository.update(doc);
    await handleJsonData(req, res, next, sensor);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function deleteSensor(req: Request, res: Response, next: Next) {
  try {
    const sensor = sensorRepository.remove(req.params.id);
    await handleJsonData(req, res, next, sensor);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function fetchSensors(req: Request, res: Response, next: Next) {
  try {
    const sensors = await sensorRepository.findAll();
    await handleJsonData(req, res, next, sensors);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function getSensor(req: Request, res: Response, next: Next) {
  try {
    const sensor = await sensorRepository.find(req.params.id);
    await handleJsonData(req, res, next, sensor);
  } catch (err) {
    handleErrors(next, err);
  }
}
