import { PumpHistorical, State } from "../models/entities/pump-historical";
import { Pump } from "../models/entities/pump";
import * as pumpHistoricalRegex from "./rules/pump-historical";
import { regexValidation, createError, rejectIfNull } from "./helpers";
import { validateId as pumpIdValidator } from "./pump";

export async function validateDate(date: Date) {
  const dateString =
    date && typeof date.toISOString === "function"
      ? date.toISOString()
      : date + "";
  await regexValidation(
    dateString,
    pumpHistoricalRegex.DateRegex,
    "The pump-historical must have a valid date"
  );
  return date;
}

export function validateState(state: State) {
  return regexValidation(
    state,
    pumpHistoricalRegex.StateRegex,
    "The pump-historical must have a valid state"
  );
}

export async function validatePump(pump: Pump | string) {
  if (!pump) {
    const err = createError("The pump-historical must have a valid pump");
    throw err;
  }
  if ("object" === typeof pump) {
    return pump;
  }
  return pumpIdValidator(pump);
}

export async function validateId(id: string) {
  if (!id || !pumpHistoricalRegex.IdRegex.test(id)) {
    const err = createError("Invalid pump-historical id");
    throw err;
  }
  return id;
}

export async function validate(
  pumpHistorical: PumpHistorical,
  checkId: boolean = true
) {
  try {
    await rejectIfNull(pumpHistorical, "Pump historical is null or undefined");
    await validateDate(pumpHistorical.date);
    await validateState(pumpHistorical.state);
    await validatePump(pumpHistorical.pump);
    if (checkId) {
      await validateId(pumpHistorical.id);
    }
  } catch (err) {
    err.message = "Invalid pump historical: " + err.message;
    throw err;
  }
  return pumpHistorical;
}
