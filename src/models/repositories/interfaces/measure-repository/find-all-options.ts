import { PaginationRequest } from '../../../../lib/pagination/request';
import { FindAllFilter } from './find-all-filter';

export interface FindAllOptions {
  paginationRequest?: PaginationRequest;
  filter?: FindAllFilter;
}
