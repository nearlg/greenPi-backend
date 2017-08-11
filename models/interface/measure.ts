import { ISensor } from "./sensor";

export interface IMeasure {
    id?: string;
    date: Date;
    sensor: ISensor | string;
    value: number;
}