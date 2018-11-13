import { IRepository } from "./repository";
import { IEnvironment } from "../../../interface/environment";

export interface IEnvironmentRepository extends IRepository<IEnvironment> {
    findById(id: string): Promise<IEnvironment | null>;
    removeById(id: string): Promise<void>;
    updateById(id: string, document: IEnvironment): Promise<IEnvironment>;
}
