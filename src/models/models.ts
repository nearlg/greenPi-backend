import { UserModel } from './user';
import { SensorModel } from './sensor';
import { PumpModel } from './pump';
import { EnvironmentModel } from './environment';
import { SensorTypeModel } from './sensor-type';
import { PumpHistoricalModel } from './pump-historical';
import { MeasureModel } from './measure';
import { GoogleModel } from './google';

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
