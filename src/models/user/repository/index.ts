import { UserMongooseRepository } from './mongoose5';
import { UserRepository } from './user';

export const userRepository: UserRepository = new UserMongooseRepository();
