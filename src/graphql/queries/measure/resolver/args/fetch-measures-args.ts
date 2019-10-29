import { FilterBy } from "../filter-by";

export interface FetchMeasuresArgs {
  filter?: {
    by: FilterBy;
    id: string;
    gte?: Date;
    lte?: Date;
    sortBy?: string;
  };
}
