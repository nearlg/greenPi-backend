import { Repository } from '../repository';
import { Measure } from '../../../entities/measure';
import { PagedData } from '../../../../lib/pagination/paged-data';
import { FindAllOptions } from './find-all-options';

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
