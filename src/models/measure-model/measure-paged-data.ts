import { PagedData } from '../../lib/pagination/paged-data';
import { FetchCriteria } from './fetch-criteria';
import { Measure } from '../entities/measure';

export interface MeasurePagedData extends PagedData<Measure> {
  criteria: FetchCriteria;
}
