import { PumpHistorical } from "../../../../models/entities/pump-historical";
import { AddPumpHistoricalArgs } from "./args/add-pump-historical-args";
import { FetchPumpHistoricalArgs } from "./args/fetch-pump-historical-args";
import { GraphqlContext } from "../../../graphql-context";

export interface PumpHistoricalResolver {
  addPumpHistorical(
    args: { pumpHistoricalData: AddPumpHistoricalArgs },
    context: GraphqlContext
  ): Promise<PumpHistorical>;
  deletePumpHistorical(
    args: { id: string },
    context: GraphqlContext
  ): Promise<PumpHistorical>;
  fetchPumpHistorical(
    args: FetchPumpHistoricalArgs,
    context: GraphqlContext
  ): Promise<PumpHistorical[]>;
  getPumpHistorical(
    args: { id: string },
    context: GraphqlContext
  ): Promise<PumpHistorical>;
}
