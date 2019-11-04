import { SensorType } from './sensor-type';

export interface Sensor {
    id?: any;
    name: string;
    description: string;
    type: SensorType | string;
    connectionPorts: number[];
}
