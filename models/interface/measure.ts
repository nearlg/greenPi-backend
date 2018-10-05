import { ISensor } from "./sensor";

export interface IMeasure {
    id?: any;
    date: Date;
    sensor: ISensor | string;
    value: number;
}
