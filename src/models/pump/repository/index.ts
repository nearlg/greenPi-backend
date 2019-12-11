import { PumpRepository } from './pump-repository';
import { PumpMongooseRepository } from './mongoose5';

export const pumpRepository: PumpRepository = new PumpMongooseRepository();
