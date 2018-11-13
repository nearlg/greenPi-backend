import { IRepository } from "./repository";
import { ISensor } from "../../../interface/sensor";

export interface ISensorRepository extends IRepository<ISensor> {
    findById(id: string): Promise<ISensor | null>;
    removeById(id: string): Promise<void>;
    updateById(id: string, document: ISensor): Promise<ISensor>;
}
