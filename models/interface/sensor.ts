import { ISensorType } from "./sensor-type";

export interface ISensor {
    id?: any;
    name: string;
    description: string;
    type: ISensorType | string;
    connectionPorts: number[];
}
