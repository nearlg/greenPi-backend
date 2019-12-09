import { FilterBy } from '../filter-by';
import { FetchFilter } from '../../../../../models/measure-model';
import { PaginationArgs } from '../../../../generics/args/pagination-args';

export interface FetchMeasuresArgs {
  by: FilterBy;
  id: string;
  pagination?: PaginationArgs;
  filter?: FetchFilter;
}
