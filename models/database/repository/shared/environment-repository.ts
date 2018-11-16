import { IRepository } from "./repository";
import { IEnvironment } from "../../../interface/environment";

export interface IEnvironmentRepository extends IRepository<IEnvironment> {
    find(id: string): Promise<IEnvironment>;
    remove(id: string): Promise<IEnvironment>;
}
