import { PumpState } from '../../../../../interfaces/entities/pump-state';

export interface AddPumpHistoricalArgs {
  date?: string;
  pump: string;
  state: PumpState;
}
