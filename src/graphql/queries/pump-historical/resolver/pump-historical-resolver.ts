import { AddPumpHistoricalArgs } from './args/add-pump-historical-args';
import { FetchPumpHistoricalArgs } from './args/fetch-pump-historical-args';
import { GraphqlContext } from '../../../graphql-context';
import { PumpHistorical } from '../../../../interfaces/entities/pump-historical';
import { PumpHistoricalPagedData } from '../../../../models/pump-historical/pump-historical-paged-data';

export interface PumpHistoricalResolver {
  addPumpHistorical(
    args: { pumpHistoricalData: AddPumpHistoricalArgs },
    context: GraphqlContext
  ): Promise<PumpHistorical>;
  deletePumpHistorical(
    args: { id: string },
    context: GraphqlContext
  ): Promise<PumpHistorical>;
  fetchPumpHistoricals(
    args: FetchPumpHistoricalArgs,
    context: GraphqlContext
  ): Promise<PumpHistoricalPagedData>;
  getPumpHistorical(
    args: { id: string },
    context: GraphqlContext
  ): Promise<PumpHistorical>;
}
