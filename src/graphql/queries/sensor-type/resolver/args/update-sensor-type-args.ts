import { Unit } from "../../../../../models/interface/unit";

export interface UpdateSensorTypeArgs {
  id: string;
  name: string;
  description: string;
  unit: Unit;
}
