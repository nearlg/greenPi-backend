import { Repository } from './repository';
import { User } from '../../models/interface/user';
import { RoleName } from '../../services/authz.service/role-name';

export interface UserRepository extends Repository<User> {
    find(email: string): Promise<User>;
    getRoleName(email: string): Promise<RoleName>;
    remove(email: string): Promise<User>;
    findByGoogleId(id: string): Promise<User>;
}
