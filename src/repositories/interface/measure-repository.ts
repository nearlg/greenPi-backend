import { Repository } from "./repository";
import { Measure } from "../../models/interface/measure";
import { Sensor } from "../../models/interface/sensor";

export interface MeasureRepository extends Repository<Measure> {
  find(id: string): Promise<Measure>;
  remove(id: string): Promise<Measure>;

  findLastsBySensorIds(sensorIds: string[]): Promise<Measure[]>;
  findLastBySensorId(sensorId: string): Promise<Measure>;

  findAllByTypeIds(
    sensorTypeIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | Measure[]>;
  findAllByTypeId(
    sensorTypeId: string,
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | Measure[]>;

  findAllBySensorId(
    sensorId: string,
    sortBy: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | Measure[]>;

  findAllBySensorIds(
    sensorIds: string[],
    sortBy?: string,
    gte?: Date,
    lte?: Date
  ): Promise<null | Measure[]>;
}
