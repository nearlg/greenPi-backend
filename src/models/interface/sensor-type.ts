import { Unit } from './unit';

export interface SensorType {
    id?: any;
    name: string;
    description: string;
    unit: Unit;
}
