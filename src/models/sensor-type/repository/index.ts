import { SensorTypeMongooseRepository } from './mongoose5';
import { SensorTypeRepository } from './sensor-type';

export const sensorTypeRepository: SensorTypeRepository = new SensorTypeMongooseRepository();
