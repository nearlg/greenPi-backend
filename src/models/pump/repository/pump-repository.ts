import { Repository } from '../../../lib/repository';
import { Pump } from '../../../interfaces/entities/pump';

export interface PumpRepository extends Repository<Pump> {
  find(id: string): Promise<Pump>;
  remove(id: string): Promise<Pump>;
}
