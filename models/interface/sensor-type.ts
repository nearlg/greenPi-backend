import { IUnit } from './unit';

export interface ISensorType {
    id?: any;
    name: string;
    description: string;
    unit: IUnit;
}
