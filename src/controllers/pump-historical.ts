import { Request, Response, Next } from "restify";
import { handleJsonData, handleErrors, checkQuery } from "./helpers";
import { PumpHistorical } from "../models/interface/pump-historical";
import {
  pumpHistoricalRepository,
  environmentRepository,
  pumpRepository
} from "../repositories";
import { Pump } from "../models/interface/pump";
import * as pumpValidator from "../validation/pump";
import * as pumpHistoricalValidator from "../validation/pump-historical";
import { socketIOService } from "../services/socket-io.service";

const commonQuery: string[] = ["gte", "lte", "sortBy"];

async function validateDependencies(
  pumpHistorical: PumpHistorical
): Promise<PumpHistorical> {
  const pumpId: string =
    (<Pump>pumpHistorical.pump).id || <string>pumpHistorical.pump;
  await pumpRepository.find(pumpId);
  return pumpHistorical;
}

async function byEnvironmentId(
  req: Request,
  res: Response,
  next: Next
): Promise<PumpHistorical[]> {
  let commQuery: string[] = commonQuery;
  commQuery.push("byEnvironmentId");
  await checkQuery(commQuery, req.query);
  let gte = req.query.gte ? new Date(req.query.gte) : null;
  let lte = req.query.lte ? new Date(req.query.lte) : null;
  let sortBy: string = req.query.sortBy;
  let environmentId: string = req.query.byEnvironmentId;
  const environment = await environmentRepository.find(environmentId);
  const pumpHistoricals = pumpHistoricalRepository.findAllByPumps(
    <Array<Pump>>environment.pumps,
    sortBy,
    gte,
    lte
  );
  return pumpHistoricals;
}

async function byPumpId(
  req: Request,
  res: Response,
  next: Next
): Promise<PumpHistorical[]> {
  let commQuery: string[] = commonQuery;
  commQuery.push("byPumpId");
  await checkQuery(commQuery, req.query);
  let gte = req.query.gte ? new Date(req.query.gte) : null;
  let lte = req.query.lte ? new Date(req.query.lte) : null;
  let sortBy: string = req.query.sortBy;
  let pumpId: string = req.query.byPumpId;
  await pumpRepository.find(pumpId);
  const pumpHistoricals = await pumpHistoricalRepository.findAllByPumpId(
    pumpId,
    sortBy,
    gte,
    lte
  );
  return pumpHistoricals;
}

async function byPump(
  req: Request,
  res: Response,
  next: Next
): Promise<PumpHistorical[]> {
  let commQuery: string[] = commonQuery;
  commQuery.push("byPump");
  await checkQuery(commQuery, req.query);
  let gte = req.query.gte ? new Date(req.query.gte) : null;
  let lte = req.query.lte ? new Date(req.query.lte) : null;
  let sortBy: string = req.query.sortBy;
  const doc = await pumpValidator.validate(req.query.pump, true);
  const pump = await pumpRepository.find(doc.id);
  const pumpHistoricals = await pumpHistoricalRepository.findAllByPump(
    pump,
    sortBy,
    gte,
    lte
  );
  return pumpHistoricals;
}

export async function getPumpHistoricals(
  req: Request,
  res: Response,
  next: Next
) {
  let pumpHistorical: PumpHistorical[];
  try {
    if (req.query.byEnvironmentId) {
      pumpHistorical = await byEnvironmentId(req, res, next);
    } else if (req.query.byPumpId) {
      pumpHistorical = await byPumpId(req, res, next);
    } else {
      pumpHistorical = await byPump(req, res, next);
    }
    await handleJsonData(req, res, next, pumpHistorical);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function addPumpHistorical(
  req: Request,
  res: Response,
  next: Next
) {
  if (!req.body.date) {
    req.body.date = new Date();
  }
  try {
    const doc = await pumpHistoricalValidator.validate(req.body, false);
    await validateDependencies(doc);
    const pumpHistorical = await pumpHistoricalRepository.create(doc);
    await handleJsonData(req, res, next, pumpHistorical);
    await socketIOService.pumpsSIOService.emitLastPumpHistorical(
      pumpHistorical
    );
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function updatePumpHistorical(
  req: Request,
  res: Response,
  next: Next
) {
  req.body.id = req.params.id;
  try {
    const doc = await pumpHistoricalValidator.validate(req.body);
    await validateDependencies(doc);
    const pumpHistorical = await pumpHistoricalRepository.update(doc);
    await handleJsonData(req, res, next, pumpHistorical);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function deletePumpHistorical(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const pumpHistorical = await pumpHistoricalRepository.remove(req.params.id);
    await handleJsonData(req, res, next, pumpHistorical);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function fetchPumpHistoricals(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const pumpHistoricals = await pumpHistoricalRepository.findAll();
    await handleJsonData(req, res, next, pumpHistoricals);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function getPumpHistorical(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const pumpHistorical = await pumpHistoricalRepository.find(req.params.id);
    await handleJsonData(req, res, next, pumpHistorical);
  } catch (err) {
    handleErrors(next, err);
  }
}
