import { IRepository } from './repository';
import { ISensor } from '../../../interface/sensor';

export interface ISensorRepository extends IRepository<ISensor> {
    find(id: string): Promise<ISensor>;
    remove(id: string): Promise<ISensor>;
}
