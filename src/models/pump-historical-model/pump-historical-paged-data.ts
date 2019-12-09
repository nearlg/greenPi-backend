import { PagedData } from '../../lib/pagination/paged-data';
import { PumpHistorical } from '../entities/pump-historical';
import { FetchCriteria } from './fetch-criteria';

export interface PumpHistoricalPagedData extends PagedData<PumpHistorical> {
  criteria: FetchCriteria;
}
