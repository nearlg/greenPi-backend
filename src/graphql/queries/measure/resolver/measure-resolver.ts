import { Request } from "restify";
import { Measure } from "../../../../models/entities/measure";
import { AddMeasureArgs } from "./args/add-measure-args";
import { FetchMeasuresArgs } from "./args/fetch-measures-args";

export interface MeasureResolver {
  addMeasure(
    args: { measureData: AddMeasureArgs },
    req: Request
  ): Promise<Measure>;
  deleteMeasure(args: { id: string }, req: Request): Promise<Measure>;
  fetchMeasures(args: FetchMeasuresArgs, req: Request): Promise<Measure[]>;
  getMeasure(args: { id: string }, req: Request): Promise<Measure>;
}
