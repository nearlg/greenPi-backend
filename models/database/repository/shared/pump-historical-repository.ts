import { IRepository } from "./repository";
import { IPumpHistorical } from "../../../interface/pump-historical";
import { IPump } from "../../../interface/pump";

export interface IPumpHistoricalRepository extends IRepository<IPumpHistorical> {

    findLastsByPumpIds(pumpIds: string[]): Promise<IPumpHistorical[]>;
    findLastByPumpId(pumpId: string): Promise<null | IPumpHistorical>;

    findAllByPumpId(pumpId: string, sortBy: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]>;
    findAllByPump(pump: IPump, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]>;

    findAllByPumpIds(pumpIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]>;
    findAllByPumps(pumps: IPump[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]>;
}
