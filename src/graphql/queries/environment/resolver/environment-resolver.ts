import { AddEnvironmentArgs } from './args/add-environment-args';
import { UpdateEnvironmentArgs } from './args/update-environment-args';
import { GraphqlContext } from '../../../graphql-context';
import { FetchEnvironmentsArgs } from './args/fetch-environments-args';
import { PagedData } from '../../../../lib/pagination/paged-data';
import { Environment } from '../../../../interfaces/entities/environment';

export interface EnvironmentResolver {
  addEnvironment(
    args: { environmentData: AddEnvironmentArgs },
    context: GraphqlContext
  ): Promise<Environment>;
  updateEnvironment(
    args: { environmentData: UpdateEnvironmentArgs },
    context: GraphqlContext
  ): Promise<Environment>;
  deleteEnvironment(
    args: { id: string },
    context: GraphqlContext
  ): Promise<Environment>;
  fetchEnvironments(
    args: FetchEnvironmentsArgs,
    context: GraphqlContext
  ): Promise<PagedData<Environment>>;
  getEnvironment(
    args: { id: string },
    context: GraphqlContext
  ): Promise<Environment>;
}
