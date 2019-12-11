import { PagedData } from '../../lib/pagination/paged-data';
import { FetchCriteria } from './fetch-criteria';
import { PumpHistorical } from '../../interfaces/entities/pump-historical';

export interface PumpHistoricalPagedData extends PagedData<PumpHistorical> {
  criteria: FetchCriteria;
}
