import { Request, Response, Next } from "restify";
import * as pumpValidator from "../validation/pump";
import { pumpRepository } from "../repositories";
import { handleJsonData, handleErrors } from "./helpers";

export async function addPump(req: Request, res: Response, next: Next) {
  try {
    const pump = await pumpValidator.validate(req.body, false);
    await pumpRepository.create(pump);
    await handleJsonData(req, res, next, pump);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function updatePump(req: Request, res: Response, next: Next) {
  try {
    req.body.id = req.params.id;
    const pump = await pumpValidator.validate(req.body);
    await pumpRepository.update(pump);
    await handleJsonData(req, res, next, pump);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function deletePump(req: Request, res: Response, next: Next) {
  try {
    const pump = await pumpRepository.remove(req.params.id);
    await handleJsonData(req, res, next, pump);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function fetchPumps(req: Request, res: Response, next: Next) {
  try {
    const pumps = await pumpRepository.findAll();
    await handleJsonData(req, res, next, pumps);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function getPump(req: Request, res: Response, next: Next) {
  try {
    const pump = await pumpRepository.find(req.params.id);
    await handleJsonData(req, res, next, pump);
  } catch (err) {
    handleErrors(next, err);
  }
}
