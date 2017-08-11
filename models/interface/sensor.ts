import { ISensorType } from "./sensor-type";

export interface ISensor {
    id?: string;
    name: string;
    description: string;
    type: ISensorType | string;
    connectionPorts: number[];
}