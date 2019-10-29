import { Unit } from "../../../../../models/interface/unit";

export interface AddSensorTypeArgs {
  name: string;
  description: string;
  unit: Unit;
}
