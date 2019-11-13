import { FilterBy } from "../filter-by";
import { FetchFilter } from "../../../../../models/pump-historical-model";
import { PaginationArgs } from "../../../../generics/args/pagination-args";

export interface FetchPumpHistoricalArgs {
  by: FilterBy;
  id: string;
  pagination?: PaginationArgs;
  filter?: FetchFilter;
}
