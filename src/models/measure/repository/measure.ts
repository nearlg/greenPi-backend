import { FindAllOptions } from './find-all-options';
import { Repository } from '../../../lib/repository';
import { Measure } from '../../../interfaces/entities/measure';
import { PagedData } from '../../../lib/pagination/paged-data';

export interface MeasureRepository extends Repository<Measure> {
  find(id: string): Promise<Measure>;
  remove(id: string): Promise<Measure>;

  findLastsBySensorIds(sensorIds: string[], limit?: number): Promise<Measure[]>;
  findLastsBySensorId(sensorId: string, limit?: number): Promise<Measure[]>;

  findAllByTypeIds(
    sensorTypeIds: string[],
    options?: FindAllOptions
  ): Promise<PagedData<Measure>>;
  findAllByTypeId(
    sensorTypeId: string,
    options?: FindAllOptions
  ): Promise<PagedData<Measure>>;

  findAllBySensorId(
    sensorId: string,
    options?: FindAllOptions
  ): Promise<PagedData<Measure>>;

  findAllBySensorIds(
    sensorIds: string[],
    options?: FindAllOptions
  ): Promise<PagedData<Measure>>;
}
