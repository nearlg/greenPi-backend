import { MeasureRepository } from './measure';
import { MeasureMongooseRepository } from './mongoose5';

export const measureRepository: MeasureRepository = new MeasureMongooseRepository();
