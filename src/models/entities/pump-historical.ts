import { Pump } from './pump';

export const enum State {
    Off = 0,
    On = 1
};

export interface PumpHistorical {
    id?: any,
    date: Date,
    pump: Pump | string,
    state: State
}
