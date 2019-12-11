import { EnvironmentRepository } from './environment-repository';
import { EnvironmentMongooseRepository } from './mongoose5';

export const environmentRepository: EnvironmentRepository = new EnvironmentMongooseRepository();
