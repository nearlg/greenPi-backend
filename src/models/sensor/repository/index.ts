import { SensorRepository } from './sensor-repository';
import { SensorMongooseRepository } from './mongoose5/sensor-repository';

export const sensorRepository: SensorRepository = new SensorMongooseRepository();
