import { Sensor } from "@/models/interface/sensor";
import { Pump } from "@/models/interface/pump";

export interface Environment {
  id?: any;
  name: string;
  description: string;
  sensors: Sensor[] | string[];
  pumps: Pump[] | string[];
}
