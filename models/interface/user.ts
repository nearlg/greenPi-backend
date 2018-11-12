import { FacebookAccount } from "./facebook-account.";
import { GoogleAccount } from "./google-account";

export interface IUser {
    id?: any;
    name: string;
    password?: string;
    email: string;
    facebook?: FacebookAccount;
    google?: GoogleAccount;
}
