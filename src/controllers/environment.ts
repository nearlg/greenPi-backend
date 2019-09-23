import { Request, Response, Next } from "restify";
import { environmentRepository } from "../repositories";
import * as environmentValidator from "../validation/environment";
import { handleJsonData, handleErrors } from "./helpers";

export async function addEnvironment(req: Request, res: Response, next: Next) {
  try {
    const doc = await environmentValidator.validate(req.body, false);
    const environment = await environmentRepository.create(doc);
    await handleJsonData(req, res, next, environment);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function updateEnvironment(
  req: Request,
  res: Response,
  next: Next
) {
  req.body.id = req.params.id;
  try {
    const doc = await environmentValidator.validate(req.body, false);
    const environment = await environmentRepository.update(doc);
    await handleJsonData(req, res, next, environment);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function deleteEnvironment(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const environment = await environmentRepository.remove(req.params.id);
    await handleJsonData(req, res, next, environment);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function fetchEnvironments(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const environments = await environmentRepository.findAll();
    await handleJsonData(req, res, next, environments);
  } catch (err) {
    handleErrors(next, err);
  }
}

export async function getEnvironment(req: Request, res: Response, next: Next) {
  try {
    const environment = await environmentRepository.find(req.params.id);
    await handleJsonData(req, res, next, environment);
  } catch (err) {
    handleErrors(next, err);
  }
}
