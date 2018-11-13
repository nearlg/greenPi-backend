import { IRepository } from "./repository";
import { ISensorType } from "../../../interface/sensor-type";

export interface ISensorTypeRepository extends IRepository<ISensorType> {
    findById(id: string): Promise<ISensorType | null>;
    removeById(id: string): Promise<void>;
    updateById(id: string, document: ISensorType): Promise<ISensorType>;
}
