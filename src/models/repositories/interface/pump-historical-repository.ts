import { Repository } from "./repository";
import { PumpHistorical } from "../../entities/pump-historical";
import { Pump } from "../../entities/pump";

export interface PumpHistoricalRepository extends Repository<PumpHistorical> {
  find(id: string): Promise<PumpHistorical>;
  remove(id: string): Promise<PumpHistorical>;

  findLastsByPumpIds(pumpIds: string[]): Promise<PumpHistorical[]>;
  findLastByPumpId(pumpId: string): Promise<PumpHistorical>;

  findAllByPumpId(
    pumpId: string,
    sortBy: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | PumpHistorical[]>;

  findAllByPumpIds(
    pumpIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | PumpHistorical[]>;
}
