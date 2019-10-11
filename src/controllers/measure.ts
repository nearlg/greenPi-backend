import { Request, Response, Next } from "restify";
import { handleJsonData, handleErrors, checkQuery } from "./helpers";
import { Measure } from "../models/interface/measure";
import {
  measureRepository,
  environmentRepository,
  sensorRepository
} from "../repositories";
import { Sensor } from "../models/interface/sensor";
import * as measureValidator from "../validation/measure";
import * as sensorValidator from "../validation/sensor";
import { socketIOService } from "../services/socket-io.service";

const commonQuery: string[] = ["gte", "lte", "sortBy"];

async function validateDependencies(measure: Measure): Promise<Measure> {
  const sensorId: string =
    (<Sensor>measure.sensor).id || <string>measure.sensor;
  await sensorRepository.find(sensorId);
  return measure;
}

async function byEnvironmentId(req: Request, res: Response, next: Next) {
  const commQuery: string[] = commonQuery;
  commQuery.push("byEnvironmentId");
  await checkQuery(commQuery, req.query);

  const gte = req.query.gte ? new Date(req.query.gte) : null;
  const lte = req.query.lte ? new Date(req.query.lte) : null;
  const sortBy: string = req.query.sortBy;
  const environmentId: string = req.query.byEnvironmentId;
  const environment = await environmentRepository.find(environmentId);
  const measures = await measureRepository.findAllBySensors(
    <Array<Sensor>>environment.sensors,
    sortBy,
    gte,
    lte
  );
  return measures;
}

async function bySensorId(req: Request, res: Response, next: Next) {
  const commQuery: string[] = commonQuery;
  commQuery.push("bySensorId");
  await checkQuery(commQuery, req.query);

  const gte = req.query.gte ? new Date(req.query.gte) : null;
  const lte = req.query.lte ? new Date(req.query.lte) : null;
  const sortBy: string = req.query.sortBy;
  const sensorId: string = req.query.bySensorId;
  await sensorRepository.find(sensorId);
  const measures = await measureRepository.findAllBySensorId(
    sensorId,
    sortBy,
    gte,
    lte
  );
  return measures;
}

async function bySensor(req: Request, res: Response, next: Next) {
  const commQuery: string[] = commonQuery;
  commQuery.push("bySensor");
  await checkQuery(commQuery, req.query);

  const gte = req.query.gte ? new Date(req.query.gte) : null;
  const lte = req.query.lte ? new Date(req.query.lte) : null;
  const sortBy: string = req.query.sortBy;
  const sensor = await sensorValidator.validate(req.query.sensor, true);
  await sensorRepository.find(sensor.id);
  const measures = await measureRepository.findAllBySensor(
    sensor,
    sortBy,
    gte,
    lte
  );
  return measures;
}

export async function getMeasures(req: Request, res: Response, next: Next) {
  let measures: Measure[];
  try {
    if (req.query.byEnvironmentId) {
      measures = await byEnvironmentId(req, res, next);
    } else if (req.query.bySensorId) {
      measures = await bySensorId(req, res, next);
    } else {
      measures = await bySensor(req, res, next);
    }
    await handleJsonData(req, res, next, measures);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function addMeasure(req: Request, res: Response, next: Next) {
  if (!req.body.date) {
    req.body.date = new Date();
  }
  try {
    const doc = await measureValidator.validate(req.body, false);
    await validateDependencies(doc);
    const measure = await measureRepository.create(doc);
    await handleJsonData<Measure>(req, res, next, measure);
    await socketIOService.sensorsSIOService.emitLastMeasure(measure);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function updateMeasure(req: Request, res: Response, next: Next) {
  req.body.id = req.params.id;
  try {
    const doc = await measureValidator.validate(req.body);
    await validateDependencies(doc);
    const measure = measureRepository.update(doc);
    await handleJsonData(req, res, next, measure);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function deleteMeasure(req: Request, res: Response, next: Next) {
  try {
    const measure = await measureRepository.remove(req.params.id);
    await handleJsonData(req, res, next, measure);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function fetchMeasures(req: Request, res: Response, next: Next) {
  try {
    const measures = measureRepository.findAll();
    await handleJsonData(req, res, next, measures);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function getMeasure(req: Request, res: Response, next: Next) {
  try {
    const measure = await measureRepository.find(req.params.id);
    await handleJsonData(req, res, next, measure);
  } catch (err) {
    handleErrors(next, err);
  }
}
