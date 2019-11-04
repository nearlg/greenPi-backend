import { Request } from "restify";
import { PumpHistorical } from "../../../../models/entities/pump-historical";
import { AddPumpHistoricalArgs } from "./args/add-pump-historical-args";
import { FetchPumpHistoricalArgs } from "./args/fetch-pump-historical-args";

export interface PumpHistoricalResolver {
  addPumpHistorical(
    args: { pumpHistoricalData: AddPumpHistoricalArgs },
    req: Request
  ): Promise<PumpHistorical>;
  deletePumpHistorical(
    args: { id: string },
    req: Request
  ): Promise<PumpHistorical>;
  fetchPumpHistorical(
    args: FetchPumpHistoricalArgs,
    req: Request
  ): Promise<PumpHistorical[]>;
  getPumpHistorical(
    args: { id: string },
    req: Request
  ): Promise<PumpHistorical>;
}
