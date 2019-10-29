import { State } from "../../../../../models/interface/pump-historical";

export interface AddPumpHistoricalArgs {
  date?: Date;
  pump: string;
  state: State;
}
