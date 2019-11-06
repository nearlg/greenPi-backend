import { FilterBy } from "../filter-by";
import { FetchFilter } from "../../../../../models/pump-historical-model";

export interface FetchPumpHistoricalArgs {
  by: FilterBy;
  id: string;
  filter?: FetchFilter;
}
