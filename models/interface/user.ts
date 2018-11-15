import { FacebookAccount } from "./facebook-account";
import { GoogleAccount } from "./google-account";
import { RoleName } from "../../services/authz-service/role-name";

export interface IUser {
    email: string;
    name: string;
    password?: string;
    facebook?: FacebookAccount;
    google?: GoogleAccount;
    roleName?: RoleName;
}
