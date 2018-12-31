import { Sensor } from './sensor';
import { Pump } from './pump';

export interface Environment {
    id?: any;
    name: string,
    description: string,
    sensors: Sensor[] | string[];
    pumps: Pump[] | string[];
}
