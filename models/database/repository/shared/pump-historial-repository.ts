import { IRepository } from "./repository";
import { IPumpHistorial } from "../../../interface/pump-historial";
import { IPump } from "../../../interface/pump";
import { IEnvironment } from "../../../interface/environment";

export interface IPumpHistorialRepository extends IRepository<IPumpHistorial> {
    findAllByPumpId(pumpId: string, gte: Date, lte: Date, sortBy: string): Promise<null | IPumpHistorial[]>;
    findAllByPump(pump: IPump, gte: Date, lte: Date, sortBy?: string): Promise<null | IPumpHistorial[]>;

    findAllByPumpIds(pumpIds: string[], gte: Date, lte: Date, sortBy: string): Promise<null | IPumpHistorial[]>;
    findAllByPumps(pumps: IPump[], gte: Date, lte: Date, sortBy?: string): Promise<null | IPumpHistorial[]>;
}