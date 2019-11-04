import { State } from "../../../../../models/entities/pump-historical";

export interface AddPumpHistoricalArgs {
  date?: Date;
  pump: string;
  state: State;
}
