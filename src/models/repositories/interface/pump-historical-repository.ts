import { Repository } from "./repository";
import { PumpHistorical } from "../../entities/pump-historical";
import { PaginatedData } from "./paginated-data";

export interface PumpHistoricalRepository extends Repository<PumpHistorical> {
  find(id: string): Promise<PumpHistorical>;
  remove(id: string): Promise<PumpHistorical>;

  findLastsByPumpIds(pumpIds: string[]): Promise<PumpHistorical[]>;
  findLastByPumpId(pumpId: string): Promise<PumpHistorical>;

  findAllByPumpId(
    pumpId: string,
    limit: number,
    page: number,
    sortBy: string,
    gte?: Date,
    lte?: Date
  ): Promise<PaginatedData<PumpHistorical>>;

  findAllByPumpIds(
    pumpIds: string[],
    limit: number,
    page: number,
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<PaginatedData<PumpHistorical>>;
}
