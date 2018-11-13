import { IRepository } from "./repository";
import { IUser } from "../../../interface/user";

export interface IUserRepository extends IRepository<IUser> {
    updateByEmail(email: string, document: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<null | IUser>;
    removeByEmail(email: string): Promise<void>;
}
