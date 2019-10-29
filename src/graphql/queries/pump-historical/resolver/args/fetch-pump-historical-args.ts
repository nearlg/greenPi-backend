import { FilterBy } from "../filter-by";

export interface FetchPumpHistoricalArgs {
  filter?: {
    by: FilterBy;
    id: string;
    gte?: Date;
    lte?: Date;
    sortBy?: string;
  };
}
