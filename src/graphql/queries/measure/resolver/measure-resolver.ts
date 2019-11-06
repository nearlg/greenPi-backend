import { Measure } from "../../../../models/entities/measure";
import { AddMeasureArgs } from "./args/add-measure-args";
import { FetchMeasuresArgs } from "./args/fetch-measures-args";
import { GraphqlContext } from "../../../graphql-context";

export interface MeasureResolver {
  addMeasure(
    args: { measureData: AddMeasureArgs },
    context: GraphqlContext
  ): Promise<Measure>;
  deleteMeasure(
    args: { id: string },
    context: GraphqlContext
  ): Promise<Measure>;
  fetchMeasures(
    args: FetchMeasuresArgs,
    context: GraphqlContext
  ): Promise<Measure[]>;
  getMeasure(args: { id: string }, context: GraphqlContext): Promise<Measure>;
}
