import { User } from '../../../interfaces/entities/user';
import { RoleName } from '../../../interfaces/entities/role-name';
import { Repository } from '../../../lib/repository';

export interface UserRepository extends Repository<User> {
  find(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  getRoleName(id: string): Promise<RoleName>;
  remove(id: string): Promise<User>;
  findByGoogleId(id: string): Promise<User>;
}
