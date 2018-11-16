import { IRepository } from "./repository";
import { IUser } from "../../../interface/user";
import { RoleName } from "../../../../services/authz-service/role-name";

export interface IUserRepository extends IRepository<IUser> {
    find(email: string): Promise<IUser>;
    getRoleName(email: string): Promise<RoleName>;
    remove(email: string): Promise<IUser>;
}
