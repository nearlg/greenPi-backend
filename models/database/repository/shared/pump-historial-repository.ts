import { IRepository } from "./repository";
import { IPumpHistorial } from "../../../interface/pump-historial";
import { IPump } from "../../../interface/pump";
import { IEnvironment } from "../../../interface/environment";

export interface IPumpHistorialRepository extends IRepository<IPumpHistorial> {
    findAllByPumpId(pumpId: string, sortBy: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorial[]>;
    findAllByPump(pump: IPump, sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorial[]>;

    findAllByPumpIds(pumpIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorial[]>;
    findAllByPumps(pumps: IPump[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | IPumpHistorial[]>;
}
