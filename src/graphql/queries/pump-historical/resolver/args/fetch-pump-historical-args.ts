import { FetchCriteria } from '../../../../../models/pump-historical-model/fetch-criteria';
import { PaginationRequest } from '../../../../../lib/pagination/request';

export interface FetchPumpHistoricalArgs {
  criteria: FetchCriteria;
  paginationRequest?: PaginationRequest;
}
