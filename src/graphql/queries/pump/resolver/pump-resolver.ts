import { AddPumpArgs } from './args/add-pump-args';
import { UpdatePumpArgs } from './args/update-pump-args';
import { GraphqlContext } from '../../../graphql-context';
import { FetchPumpsArgs } from './args/fetch-pumps-args';
import { PagedData } from '../../../../lib/pagination/paged-data';
import { Pump } from '../../../../interfaces/entities/pump';

export interface PumpResolver {
  addPump(
    args: { pumpData: AddPumpArgs },
    context: GraphqlContext
  ): Promise<Pump>;
  updatePump(
    args: { pumpData: UpdatePumpArgs },
    context: GraphqlContext
  ): Promise<Pump>;
  deletePump(args: { id: string }, context: GraphqlContext): Promise<Pump>;
  fetchPumps(
    args: FetchPumpsArgs,
    context: GraphqlContext
  ): Promise<PagedData<Pump>>;
  getPump(args: { id: string }, context: GraphqlContext): Promise<Pump>;
}
