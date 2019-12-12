import { Model } from '../model';
import { AuthData } from '../../interfaces/auth-data';
import * as measureValidator from '../../validation/measure';
import { PaginationRequest } from '../../lib/pagination/request';
import { FetchCriteria } from './fetch-criteria';
import { FetchBy } from './fetch-by';
import { MeasurePagedData } from './measure-paged-data';
import { RoleName } from '../../interfaces/entities/role-name';
import { Measure } from '../../interfaces/entities/measure';
import { Sensor } from '../../interfaces/entities/sensor';
import { sensorRepository } from '../sensor/repository';
import { rejectIfNotAuthorized } from '../../helpers/model';
import { environmentRepository } from '../environment/repository';
import { FindAllOptions } from '../pump-historical/repository/find-all-options';
import { measureRepository } from './repository';
import { PagedData } from '../../lib/pagination/paged-data';

enum RuleName {
  Add = 'measure.addSensor',
  Delete = 'measure.delete',
  FetchByEnvironmentId = 'measure.fetchByEnvironmentId',
  FetchBySensorId = 'measure.fetchBySensorId',
  Get = 'measure.get'
}

export class MeasureModel implements Model {
  rules: Map<string, Set<RoleName>>;
  authData: AuthData;

  constructor(authData: AuthData) {
    this.authData = authData;
    this.rules = new Map([
      [RuleName.Add, new Set([RoleName.Admin])],
      [RuleName.Delete, new Set([RoleName.Admin])],
      [
        RuleName.FetchByEnvironmentId,
        new Set([RoleName.Admin, RoleName.Observer])
      ],
      [RuleName.FetchBySensorId, new Set([RoleName.Admin, RoleName.Observer])],
      [RuleName.Get, new Set([RoleName.Admin, RoleName.Observer])]
    ]);
  }

  private async validateDependencies(measure: Measure) {
    const sensorId: string =
      (<Sensor>measure.sensor).id || <string>measure.sensor;
    await sensorRepository.find(sensorId);
    return measure;
  }

  private static populateItems(
    sensors: Sensor[],
    pagedData: PagedData<Measure>
  ) {
    // Obtein an object with all the items by id as a fieldName.
    // this makes easier to get access to the item by its 'id'
    const sensorsById = sensors.reduce((obj, sensor) => {
      return { ...obj, [sensor.id]: sensor };
    }, {});
    pagedData.items.map(item => {
      const sensorId = item.sensor + '';
      const sensor = sensorsById[sensorId];
      if (sensor) {
        item.sensor = sensor;
      }
      return item;
    });
  }

  private async fetchByEnvironmentId(
    criteria: FetchCriteria,
    paginationRequest?: PaginationRequest
  ) {
    rejectIfNotAuthorized(this, RuleName.FetchByEnvironmentId);
    const environment = await environmentRepository.find(criteria.id);
    const sensorIds = (<Sensor[]>environment.sensors).map(s => <string>s.id);
    const options: FindAllOptions = {
      filter: criteria.filter,
      paginationRequest
    };
    const docs = await measureRepository.findAllBySensorIds(sensorIds, options);
    MeasureModel.populateItems(<Sensor[]>environment.sensors, docs);
    const pagedData: MeasurePagedData = {
      ...docs,
      criteria
    };
    return pagedData;
  }

  private async fetchBySensorId(
    criteria: FetchCriteria,
    paginationRequest?: PaginationRequest
  ) {
    rejectIfNotAuthorized(this, RuleName.FetchBySensorId);
    await sensorRepository.find(criteria.id);
    const options: FindAllOptions = {
      filter: criteria.filter,
      paginationRequest
    };
    const docs = await measureRepository.findAllBySensorId(
      criteria.id,
      options
    );
    // Because the items are fetched by sensorId, it is not necessary
    // to populate the sensor in all the items. It is suppose that the
    // frontend has the sensor already populated
    const pagedData: MeasurePagedData = {
      ...docs,
      criteria
    };
    return pagedData;
  }

  async fetchBy(
    criteria: FetchCriteria,
    paginationRequest?: PaginationRequest
  ) {
    if (criteria.by === FetchBy.EnvironmentId) {
      return this.fetchByEnvironmentId(criteria, paginationRequest);
    }
    if (criteria.by === FetchBy.SensorId) {
      return this.fetchBySensorId(criteria, paginationRequest);
    }
  }

  async add(data: Measure) {
    rejectIfNotAuthorized(this, RuleName.Add);
    await measureValidator.validate(data, false);
    await this.validateDependencies(data);
    const doc = await measureRepository.create(data);
    return doc;
    // TODO: implement socket.io
    // await socketIOService.sensorsSIOService.emitLastMeasure(measure);
  }

  async delete(id: string) {
    rejectIfNotAuthorized(this, RuleName.Delete);
    const doc = await measureRepository.remove(id);
    return doc;
  }

  async get(id: string) {
    rejectIfNotAuthorized(this, RuleName.Get);
    const doc = await measureRepository.find(id);
    return doc;
  }
}
