import { ISensor } from "./sensor";
import { IPump } from "./pump";

export interface IEnvironment {
    id?: string;
    name: string,
    description: string,
    sensors: ISensor[] | string[];
    pumps: IPump[] | string[];
}