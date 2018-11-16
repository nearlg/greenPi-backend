import { IRepository } from './repository';
import { ISensorType } from '../../../interface/sensor-type';

export interface ISensorTypeRepository extends IRepository<ISensorType> {
    find(id: string): Promise<ISensorType>;
    remove(id: string): Promise<ISensorType>;
}
