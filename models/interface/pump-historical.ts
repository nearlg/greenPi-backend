import { IPump } from "./pump";

export const enum State {
    Off = 0,
    On = 1
};

export interface IPumpHistorical {
    id?: any,
    date: Date,
    pump: IPump | string,
    state: State
}
