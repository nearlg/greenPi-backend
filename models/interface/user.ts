import { FacebookAccount } from "./facebook-account";
import { GoogleAccount } from "./google-account";

export interface IUser {
    email: string;
    name: string;
    password?: string;
    facebook?: FacebookAccount;
    google?: GoogleAccount;
}
