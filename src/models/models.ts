import { UserModel } from "./user-model";
import { SensorModel } from "./sensor-model";
import { PumpModel } from "./pump-model";
import { EnvironmentModel } from "./environment-model";
import { SensorTypeModel } from "./sensor-type-model";
import { PumpHistoricalModel } from "./pump-historical-model";
import { MeasureModel } from "./measure-model";
import { GoogleModel } from "./google-model";

export interface Models {
  user: UserModel;
  sensor: SensorModel;
  pump: PumpModel;
  environment: EnvironmentModel;
  sensorType: SensorTypeModel;
  pumpHistorical: PumpHistoricalModel;
  measure: MeasureModel;
  google: GoogleModel;
}
