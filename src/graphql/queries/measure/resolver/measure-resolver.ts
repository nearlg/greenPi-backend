import { Measure } from '../../../../models/entities/measure';
import { AddMeasureArgs } from './args/add-measure-args';
import { FetchMeasuresArgs } from './args/fetch-measures-args';
import { GraphqlContext } from '../../../graphql-context';
import { PagedData } from '../../../../lib/pagination/paged-data';

export interface MeasureResolver {
  addMeasure(
    args: { measureData: AddMeasureArgs },
    context: GraphqlContext
  ): Promise<Measure>;
  deleteMeasure(
    args: { id: string },
    context: GraphqlContext
  ): Promise<Measure>;
  fetchMeasures(
    args: FetchMeasuresArgs,
    context: GraphqlContext
  ): Promise<PagedData<Measure>>;
  getMeasure(args: { id: string }, context: GraphqlContext): Promise<Measure>;
}
