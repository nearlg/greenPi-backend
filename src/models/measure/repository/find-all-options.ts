import { FindAllFilter } from './find-all-filter';
import { PaginationRequest } from '../../../lib/pagination/request';

export interface FindAllOptions {
  paginationRequest?: PaginationRequest;
  filter?: FindAllFilter;
}
