import { IPump } from "./pump";

export const enum State {
    OFF = 0,
    ON
};

export interface IPumpHistorial {
    id?: string,
    date: Date,
    pump: IPump | string,
    state: State
}