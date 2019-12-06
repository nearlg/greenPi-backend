import { PumpState } from '../../../../../models/entities/pump-state';

export interface AddPumpHistoricalArgs {
  date?: string;
  pump: string;
  state: PumpState;
}
