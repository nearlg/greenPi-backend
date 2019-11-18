import { Pump } from './pump';
import { PumpState } from './pump-state';

export interface PumpHistorical {
  id?: any;
  date: Date;
  pump: Pump | string;
  state: PumpState;
}
