import { RoleName } from '../../services/authz.service/role-name';

export interface User {
    name: string;
    email: string;
    roleName: RoleName;
    password?: string;
    facebookId?: string;
    googleId?: string;
}
