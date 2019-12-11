import { PaginationRequest } from '../../../../../lib/pagination/request';
import { FetchCriteria } from '../../../../../models/pump-historical/fetch-criteria';

export interface FetchPumpHistoricalArgs {
  criteria: FetchCriteria;
  paginationRequest?: PaginationRequest;
}
