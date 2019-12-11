import { AddSensorTypeArgs } from './args/add-sensor-type-args';
import { UpdateSensorTypeArgs } from './args/update-sensor-type-args';
import { GraphqlContext } from '../../../graphql-context';
import { FetchSensorTypesArgs } from './args/fetch-sensor-types-args';
import { PagedData } from '../../../../lib/pagination/paged-data';
import { SensorType } from '../../../../interfaces/entities/sensor-type';

export interface SensorTypeResolver {
  addSensorType(
    args: { sensorTypeData: AddSensorTypeArgs },
    context: GraphqlContext
  ): Promise<SensorType>;
  updateSensorType(
    args: { sensorTypeData: UpdateSensorTypeArgs },
    context: GraphqlContext
  ): Promise<SensorType>;
  deleteSensorType(
    args: { id: string },
    context: GraphqlContext
  ): Promise<SensorType>;
  fetchSensorTypes(
    args: FetchSensorTypesArgs,
    context: GraphqlContext
  ): Promise<PagedData<SensorType>>;
  getSensorType(
    args: { id: string },
    context: GraphqlContext
  ): Promise<SensorType>;
}
