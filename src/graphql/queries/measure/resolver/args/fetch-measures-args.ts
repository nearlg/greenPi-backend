import { PaginationRequest } from '../../../../../lib/pagination/request';
import { FetchCriteria } from '../../../../../models/measure/fetch-criteria';

export interface FetchMeasuresArgs {
  criteria: FetchCriteria;
  paginationRequest?: PaginationRequest;
}
