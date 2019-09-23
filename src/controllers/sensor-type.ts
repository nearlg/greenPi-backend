import { Request, Response, Next } from "restify";
import { handleJsonData, handleErrors } from "./helpers";
import * as sensorTypeValidator from "../validation/sensor-type";
import { sensorTypeRepository } from "../repositories";

export async function addSensorType(req: Request, res: Response, next: Next) {
  req.body.unit = {
    name: req.body.unitName ? req.body.unitName : null,
    description: req.body.unitDescription ? req.body.unitDescription : null
  };
  try {
    const doc = await sensorTypeValidator.validate(req.body, false);
    const sensorType = await sensorTypeRepository.create(doc);
    await handleJsonData(req, res, next, sensorType);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function updateSensorType(
  req: Request,
  res: Response,
  next: Next
) {
  req.body.id = req.params.id;
  req.body.unit = {
    name: req.body.unitName ? req.body.unitName : null,
    description: req.body.unitDescription ? req.body.unitDescription : null
  };
  try {
    const doc = await sensorTypeValidator.validate(req.body);
    const sensorType = await sensorTypeRepository.update(doc);
    await handleJsonData(req, res, next, sensorType);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function deleteSensorType(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const sensorType = await sensorTypeRepository.remove(req.params.id);
    await handleJsonData(req, res, next, sensorType);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function fetchSensorTypes(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const sensorTypes = await sensorTypeRepository.findAll();
    await handleJsonData(req, res, next, sensorTypes);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function getSensorType(req: Request, res: Response, next: Next) {
  try {
    const sensorType = await sensorTypeRepository.find(req.params.id);
    await handleJsonData(req, res, next, sensorType);
  } catch (err) {
    handleErrors(next, err);
  }
}
