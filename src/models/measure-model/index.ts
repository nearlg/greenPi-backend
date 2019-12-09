import { Model } from '../model';
import { Measure } from '../entities/measure';
import { RoleName } from '../role-name';
import {
  measureRepository,
  sensorRepository,
  environmentRepository
} from '../repositories';
import { rejectIfNotAuthorized } from '../helpers';
import { AuthData } from '../../lib/auth-data';
import * as measureValidator from '../../validation/measure';
import { Sensor } from '../entities/sensor';
import { PaginationRequest } from '../../lib/pagination/request';
import { FetchCriteria } from './fetch-criteria';
import { FetchBy } from './fetch-by';
import { FindAllOptions } from '../repositories/interfaces/measure-repository/find-all-options';
import { MeasurePagedData } from './measure-paged-data';

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
