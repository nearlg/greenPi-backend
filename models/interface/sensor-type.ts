import { IUnit } from "./unit";

export interface ISensorType {
    id?: string;
    name: string;
    description: string;
    unit: IUnit;
}