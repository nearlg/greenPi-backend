import { Model } from "./model";
import { PumpHistorical } from "../entities/pump-historical";
import { RoleName } from "../role-name";

export interface PumpHistoricalModel extends Model<PumpHistorical> {
  find(roleName: RoleName, id: string): Promise<PumpHistorical>;
  remove(roleName: RoleName, id: string): Promise<PumpHistorical>;

  findLastsByPumpIds(
    roleName: RoleName,
    pumpIds: string[]
  ): Promise<PumpHistorical[]>;
  findLastByPumpId(roleName: RoleName, pumpId: string): Promise<PumpHistorical>;

  findAllByPumpId(
    roleName: RoleName,
    pumpId: string,
    sortBy: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | PumpHistorical[]>;

  findAllByPumpIds(
    roleName: RoleName,
    pumpIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | PumpHistorical[]>;
}
