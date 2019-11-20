import { AuthData } from '../lib/auth-data';
import { UserModel } from './user-model';
import { SensorModel } from './sensor-model';
import { PumpModel } from './pump-model';
import { EnvironmentModel } from './environment-model';
import { SensorTypeModel } from './sensor-type-model';
import { PumpHistoricalModel } from './pump-historical-model';
import { MeasureModel } from './measure-model';
import { GoogleModel } from './google-model';

export function getModels(authData: AuthData) {
  const models = {
    user: new UserModel(authData),
    sensor: new SensorModel(authData),
    pump: new PumpModel(authData),
    environment: new EnvironmentModel(authData),
    sensorType: new SensorTypeModel(authData),
    pumpHistorical: new PumpHistoricalModel(authData),
    measure: new MeasureModel(authData),
    google: new GoogleModel(authData)
  };
  return models;
}
