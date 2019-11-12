import { Repository } from "./repository";
import { Measure } from "../../entities/measure";
import { PaginatedData } from "./paginated-data";

export interface MeasureRepository extends Repository<Measure> {
  find(id: string): Promise<Measure>;
  remove(id: string): Promise<Measure>;

  findLastsBySensorIds(sensorIds: string[]): Promise<Measure[]>;
  findLastBySensorId(sensorId: string): Promise<Measure>;

  findAllByTypeIds(
    sensorTypeIds: string[],
    limit: number,
    page: number,
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<PaginatedData<Measure>>;
  findAllByTypeId(
    sensorTypeId: string,
    limit: number,
    page: number,
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<PaginatedData<Measure>>;

  findAllBySensorId(
    sensorId: string,
    limit: number,
    page: number,
    sortBy: string,
    gte?: Date,
    lte?: Date
  ): Promise<PaginatedData<Measure>>;

  findAllBySensorIds(
    sensorIds: string[],
    limit: number,
    page: number,
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<PaginatedData<Measure>>;
}
