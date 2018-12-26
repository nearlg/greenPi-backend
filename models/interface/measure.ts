import { Sensor } from './sensor';

export interface Measure {
    id?: any;
    date: Date;
    sensor: Sensor | string;
    value: number;
}
