import { Repository } from "./repository";
import { Measure } from "../../entities/measure";
import { PaginationData } from "../../../lib/pagination/data";
import { PaginationRequest } from "../../../lib/pagination/request";

export interface FindAllFilter {
  gte?: Date;
  lte?: Date;
  sortBy?: string;
}

export interface MeasureRepository extends Repository<Measure> {
  find(id: string): Promise<Measure>;
  remove(id: string): Promise<Measure>;

  findLastsBySensorIds(sensorIds: string[]): Promise<Measure[]>;
  findLastBySensorId(sensorId: string): Promise<Measure>;

  findAllByTypeIds(
    sensorTypeIds: string[],
    pagination?: PaginationRequest,
    filter?: FindAllFilter
  ): Promise<PaginationData<Measure>>;
  findAllByTypeId(
    sensorTypeId: string,
    pagination?: PaginationRequest,
    filter?: FindAllFilter
  ): Promise<PaginationData<Measure>>;

  findAllBySensorId(
    sensorId: string,
    pagination?: PaginationRequest,
    filter?: FindAllFilter
  ): Promise<PaginationData<Measure>>;

  findAllBySensorIds(
    sensorIds: string[],
    pagination?: PaginationRequest,
    filter?: FindAllFilter
  ): Promise<PaginationData<Measure>>;
}
