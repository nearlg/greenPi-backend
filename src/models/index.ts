import { AuthData } from '../interfaces/auth-data';
import { UserModel } from './user';
import { SensorModel } from './sensor';
import { PumpModel } from './pump';
import { EnvironmentModel } from './environment';
import { SensorTypeModel } from './sensor-type';
import { PumpHistoricalModel } from './pump-historical';
import { MeasureModel } from './measure';
import { GoogleModel } from './google';

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
