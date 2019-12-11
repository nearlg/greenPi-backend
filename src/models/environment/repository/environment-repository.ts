import { Repository } from '../../../lib/repository';
import { Environment } from '../../../interfaces/entities/environment';

export interface EnvironmentRepository extends Repository<Environment> {
  find(id: string): Promise<Environment>;
  remove(id: string): Promise<Environment>;
}
