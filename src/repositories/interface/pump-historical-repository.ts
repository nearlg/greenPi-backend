import { Repository } from './repository';
import { PumpHistorical } from '../../models/interface/pump-historical';
import { Pump } from '../../models/interface/pump';

export interface PumpHistoricalRepository extends Repository<PumpHistorical> {

    find(id: string): Promise<PumpHistorical>;
    remove(id: string): Promise<PumpHistorical>;

    findLastsByPumpIds(pumpIds: string[]): Promise<PumpHistorical[]>;
    findLastByPumpId(pumpId: string): Promise<PumpHistorical>;

    findAllByPumpId(pumpId: string, sortBy: string, gte?: Date, lte?: Date): Promise<null | PumpHistorical[]>;
    findAllByPump(pump: Pump, sortBy?: string, gte?: Date, lte?: Date): Promise<null | PumpHistorical[]>;

    findAllByPumpIds(pumpIds: string[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | PumpHistorical[]>;
    findAllByPumps(pumps: Pump[], sortBy?: string, gte?: Date, lte?: Date): Promise<null | PumpHistorical[]>;
}
