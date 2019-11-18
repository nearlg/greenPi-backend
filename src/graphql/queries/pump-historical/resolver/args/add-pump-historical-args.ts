import { PumpState } from '../../../../../models/entities/pump-state';

export interface AddPumpHistoricalArgs {
  date?: Date;
  pump: string;
  state: PumpState;
}
