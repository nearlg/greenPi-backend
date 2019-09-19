import { PumpHistorical, State } from "@/models/interface/pump-historical";
import { Pump } from "@/models/interface/pump";
import * as pumpHistoricalRegex from "@validation/rules/pump-historical";
import {
  regexValidation,
  createError,
  rejectIfNull
} from "@validation/helpers";
import { validateId as pumpIdValidator } from "@validation/pump";

export function validateDate(date: Date): Promise<Date> {
  let dateString: string =
    date && typeof date.toISOString === "function"
      ? date.toISOString()
      : date + "";
  return regexValidation(
    dateString,
    pumpHistoricalRegex.DateRegex,
    "The pump-historical must have a valid date"
  ).then(() => Promise.resolve(date));
}

export function validateState(state: State): Promise<number> {
  return regexValidation(
    state,
    pumpHistoricalRegex.StateRegex,
    "The pump-historical must have a valid state"
  );
}

export function validatePump(pump: Pump | string): Promise<Pump | string> {
  if (pump) {
    if ("object" === typeof pump) {
      return Promise.resolve(pump);
    }
    return pumpIdValidator(pump);
  }
  let err: Error = createError("The pump-historical must have a valid pump");
  return Promise.reject(err);
}

export function validateId(id: string): Promise<string> {
  if (id && pumpHistoricalRegex.IdRegex.test(id)) {
    return Promise.resolve(id);
  }
  let err: Error = createError("Invalid pump-historical id");
  return Promise.reject(err);
}

export function validate(
  pumpHistorical: PumpHistorical,
  checkId: boolean = true
): Promise<PumpHistorical> {
  return rejectIfNull(pumpHistorical, "Pump historical is null or undefined")
    .then(() => validateDate(pumpHistorical.date))
    .then(() => validateState(pumpHistorical.state))
    .then(() => validatePump(pumpHistorical.pump))
    .then(() =>
      checkId ? validateId(pumpHistorical.id) : Promise.resolve(null)
    )
    .then(() => Promise.resolve(pumpHistorical))
    .catch(err => {
      err.message = "Invalid pump historical: " + err.message;
      return Promise.reject(err);
    });
}
