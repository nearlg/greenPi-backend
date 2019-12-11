import { PumpHistoricalRepository } from './pump-historical';
import { PumpHistoricalMongooseRepository } from './mongoose5';

export const pumpHistoricalRepository: PumpHistoricalRepository = new PumpHistoricalMongooseRepository();
