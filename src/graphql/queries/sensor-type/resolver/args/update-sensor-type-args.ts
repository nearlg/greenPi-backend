import { Unit } from "../../../../../models/entities/unit";

export interface UpdateSensorTypeArgs {
  id: string;
  name: string;
  description: string;
  unit: Unit;
}
