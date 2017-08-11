import { IRepository } from "./repository";
import { IMeasure } from "../../../interface/measure";
import { ISensor } from "../../../interface/sensor";
import { IEnvironment } from "../../../interface/environment";

export interface IMeasureRepository extends IRepository<IMeasure> {
    findAllByTypeIds(sensorTypeIds: string[], gte: Date, lte: Date, sortBy: string): Promise<null | IMeasure[]>;
    findAllByTypeId(sensorTypeId: string, gte: Date, lte: Date, sortBy: string): Promise<null | IMeasure[]>;

    findAllBySensorId(sensorId: string, gte: Date, lte: Date, sortBy: string): Promise<null | IMeasure[]>;
    findAllBySensor(sensor: ISensor, gte: Date, lte: Date, sortBy?: string): Promise<null | IMeasure[]>;

    findAllBySensorIds(sensorIds: string[], gte: Date, lte: Date, sortBy: string): Promise<null | IMeasure[]>;
    findAllBySensors(sensors: ISensor[], gte: Date, lte: Date, sortBy?: string): Promise<null | IMeasure[]>;
}