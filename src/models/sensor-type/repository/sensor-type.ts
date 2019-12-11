import { SensorType } from '../../../interfaces/entities/sensor-type';
import { Repository } from '../../../lib/repository';

export interface SensorTypeRepository extends Repository<SensorType> {
  find(id: string): Promise<SensorType>;
  remove(id: string): Promise<SensorType>;
}
