import { FilterBy } from "../filter-by";
import { FetchFilter } from "../../../../../models/measure-model";

export interface FetchMeasuresArgs {
  by: FilterBy;
  id: string;
  filter?: FetchFilter;
}
