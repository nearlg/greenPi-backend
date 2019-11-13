import { Repository } from "./repository";
import { PumpHistorical } from "../../entities/pump-historical";
import { PaginationData } from "../../../lib/pagination/data";
import { PaginationRequest } from "../../../lib/pagination/request";

export interface FindAllFilter {
  gte?: Date;
  lte?: Date;
  sortBy?: string;
}

export interface PumpHistoricalRepository extends Repository<PumpHistorical> {
  find(id: string): Promise<PumpHistorical>;
  remove(id: string): Promise<PumpHistorical>;

  findLastsByPumpIds(pumpIds: string[]): Promise<PumpHistorical[]>;
  findLastByPumpId(pumpId: string): Promise<PumpHistorical>;

  findAllByPumpId(
    pumpId: string,
    pagination?: PaginationRequest,
    filter?: FindAllFilter
  ): Promise<PaginationData<PumpHistorical>>;

  findAllByPumpIds(
    pumpIds: string[],
    pagination?: PaginationRequest,
    filter?: FindAllFilter
  ): Promise<PaginationData<PumpHistorical>>;
}
