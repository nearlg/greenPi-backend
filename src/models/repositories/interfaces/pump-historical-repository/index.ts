import { Repository } from '../repository';
import { PumpHistorical } from '../../../entities/pump-historical';
import { FindAllOptions } from './find-all-options';
import { PagedData } from '../../../../lib/pagination/paged-data';

export interface PumpHistoricalRepository extends Repository<PumpHistorical> {
  find(id: string): Promise<PumpHistorical>;
  remove(id: string): Promise<PumpHistorical>;

  findLastsByPumpIds(
    pumpIds: string[],
    limit?: number
  ): Promise<PumpHistorical[]>;
  findLastsByPumpId(pumpId: string, limit?: number): Promise<PumpHistorical[]>;
  findAllByPumpIds(
    pumpIds: string[],
    options?: FindAllOptions
  ): Promise<PagedData<PumpHistorical>>;
}
