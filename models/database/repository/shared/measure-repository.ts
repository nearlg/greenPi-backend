import { IRepository } from "./repository";
import { IMeasure } from "../../../interface/measure";
import { ISensor } from "../../../interface/sensor";

export interface IMeasureRepository extends IRepository<IMeasure> {

    findLastsBySensorIds(sensorIds: string[], gte?: Date, lte?: Date): Promise<IMeasure[]>;
    findLastBySensorId(sensorId: string, gte?: Date, lte?: Date): Promise<null | IMeasure>;

    findAllByTypeIds(sensorTypeIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IMeasure[]>;
    findAllByTypeId(sensorTypeId: string, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IMeasure[]>;

    findAllBySensorId(sensorId: string, sortBy: string, gte?: Date, lte?: Date): Promise<null | IMeasure[]>;
    findAllBySensor(sensor: ISensor, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IMeasure[]>;

    findAllBySensorIds(sensorIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IMeasure[]>;
    findAllBySensors(sensors: ISensor[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IMeasure[]>;
}
