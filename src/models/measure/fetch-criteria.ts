import { FetchFilter } from './fetch-filter';
import { FetchBy } from './fetch-by';

export interface FetchCriteria {
  by: FetchBy;
  id: string;
  filter?: FetchFilter;
}
