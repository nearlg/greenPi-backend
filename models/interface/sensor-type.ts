import { Unit } from "@/models/interface/unit";

export interface SensorType {
  id?: any;
  name: string;
  description: string;
  unit: Unit;
}
