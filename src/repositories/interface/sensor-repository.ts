import { Repository } from './repository';
import { Sensor } from '../../models/interface/sensor';

export interface SensorRepository extends Repository<Sensor> {
    find(id: string): Promise<Sensor>;
    remove(id: string): Promise<Sensor>;
}
