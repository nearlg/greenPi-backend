import { IRepository } from "./repository";
import { IPumpHistorical } from "../../../interface/pump-historical";
import { IPump } from "../../../interface/pump";
import { IEnvironment } from "../../../interface/environment";

export interface IPumpHistoricalRepository extends IRepository<IPumpHistorical> {
    findAllByPumpId(pumpId: string, sortBy: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]>;
    findAllByPump(pump: IPump, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]>;

    findAllByPumpIds(pumpIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]>;
    findAllByPumps(pumps: IPump[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorical[]>;
}
