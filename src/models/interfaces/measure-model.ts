import { Model } from "./model";
import { Measure } from "../entities/measure";
import { RoleName } from "../role-name";

export interface MeasureModel extends Model<Measure> {
  find(roleName: RoleName, id: string): Promise<Measure>;
  remove(roleName: RoleName, id: string): Promise<Measure>;

  findLastsBySensorIds(
    roleName: RoleName,
    sensorIds: string[]
  ): Promise<Measure[]>;
  findLastBySensorId(roleName: RoleName, sensorId: string): Promise<Measure>;

  findAllByTypeIds(
    roleName: RoleName,
    sensorTypeIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | Measure[]>;
  findAllByTypeId(
    roleName: RoleName,
    sensorTypeId: string,
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | Measure[]>;

  findAllBySensorId(
    roleName: RoleName,
    sensorId: string,
    sortBy: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | Measure[]>;

  findAllBySensorIds(
    roleName: RoleName,
    sensorIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | Measure[]>;
}
