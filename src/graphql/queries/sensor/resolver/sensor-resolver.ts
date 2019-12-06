import { Sensor } from '../../../../models/entities/sensor';
import { AddSensorArgs } from './args/add-sensor-args';
import { UpdateSensorArgs } from './args/update-sensor-args';
import { GraphqlContext } from '../../../graphql-context';
import { FetchSensorsArgs } from './args/fetch-sensors-args';
import { PagedData } from '../../../../lib/pagination/paged-data';

export interface SensorResolver {
  addSensor(
    args: { sensorData: AddSensorArgs },
    context: GraphqlContext
  ): Promise<Sensor>;
  updateSensor(
    args: { sensorData: UpdateSensorArgs },
    context: GraphqlContext
  ): Promise<Sensor>;
  deleteSensor(args: { id: string }, context: GraphqlContext): Promise<Sensor>;
  fetchSensors(
    args: FetchSensorsArgs,
    context: GraphqlContext
  ): Promise<PagedData<Sensor>>;
  getSensor(args: { id: string }, context: GraphqlContext): Promise<Sensor>;
}
