import { Repository } from '../../../lib/repository';
import { Sensor } from '../../../interfaces/entities/sensor';

export interface SensorRepository extends Repository<Sensor> {
  find(id: string): Promise<Sensor>;
  remove(id: string): Promise<Sensor>;
}
