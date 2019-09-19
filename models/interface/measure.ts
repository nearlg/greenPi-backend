import { Sensor } from "@/models/interface/sensor";

export interface Measure {
  id?: any;
  date: Date;
  sensor: Sensor | string;
  value: number;
}
