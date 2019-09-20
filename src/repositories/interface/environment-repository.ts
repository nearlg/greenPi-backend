import { Repository } from './repository';
import { Environment } from '../../models/interface/environment';

export interface EnvironmentRepository extends Repository<Environment> {
    find(id: string): Promise<Environment>;
    remove(id: string): Promise<Environment>;
}
