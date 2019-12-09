import { Model } from '../model';
import { PumpHistorical } from '../entities/pump-historical';
import { RoleName } from '../role-name';
import {
  pumpHistoricalRepository,
  pumpRepository,
  environmentRepository
} from '../repositories';
import { rejectIfNotAuthorized } from '../helpers';
import { AuthData } from '../../lib/auth-data';
import * as pumpHistoricalValidator from '../../validation/pump-historical';
import { Pump } from '../entities/pump';
import { PaginationRequest } from '../../lib/pagination/request';
import { FetchCriteria } from './fetch-criteria';
import { FindAllOptions } from '../repositories/interfaces/pump-historical-repository/find-all-options';
import { FetchFilter } from './fetch-filter';
import { FetchBy } from './fetch-by';
import { PumpHistoricalPagedData } from './pump-historical-paged-data';

enum RuleName {
  Add = 'pumpHistorical.add',
  Delete = 'pumpHistorical.delete',
  FetchByEnvironmentId = 'pumpHistorical.fetchByEnvironmentId',
  FetchByPumpId = 'pumpHistorical.fetchByPumpId',
  Get = 'pumpHistorical.getSensor'
}

export class PumpHistoricalModel implements Model {
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
      [RuleName.FetchByPumpId, new Set([RoleName.Admin, RoleName.Observer])],
      [RuleName.Get, new Set([RoleName.Admin, RoleName.Observer])]
    ]);
  }

  private async validateDependencies(pumpHistorical: PumpHistorical) {
    const pumpId: string =
      (<Pump>pumpHistorical.pump).id || <string>pumpHistorical.pump;
    await pumpRepository.find(pumpId);
    return pumpHistorical;
  }

  private async fetchByEnvironmentId(
    criteria: FetchCriteria,
    paginationRequest?: PaginationRequest
  ) {
    rejectIfNotAuthorized(this, RuleName.FetchByEnvironmentId);
    const environment = await environmentRepository.find(criteria.id);
    const pumpIds = (<Pump[]>environment.pumps).map(p => <string>p.id);
    const options: FindAllOptions = {
      filter: criteria.filter,
      paginationRequest
    };
    const docs = await pumpHistoricalRepository.findAllByPumpIds(
      pumpIds,
      options
    );
    const pagedData: PumpHistoricalPagedData = {
      ...docs,
      criteria
    };
    return pagedData;
  }

  private async fetchByPumpIds(
    criteria: FetchCriteria,
    paginationRequest?: PaginationRequest
  ) {
    rejectIfNotAuthorized(this, RuleName.FetchByPumpId);
    await pumpRepository.find(criteria.id);
    const options: FindAllOptions = {
      filter: criteria.filter,
      paginationRequest
    };
    const docs = await pumpHistoricalRepository.findAllByPumpIds(
      [criteria.id],
      options
    );
    const pagedData: PumpHistoricalPagedData = {
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
    if (criteria.by === FetchBy.PumpId) {
      return this.fetchByPumpIds(criteria, paginationRequest);
    }
  }

  async add(data: PumpHistorical) {
    rejectIfNotAuthorized(this, RuleName.Add);
    await pumpHistoricalValidator.validate(data, false);
    await this.validateDependencies(data);
    const doc = await pumpHistoricalRepository.create(data);
    return doc;
    // TODO: implement socket.io
    // await socketIOService.pumpsSIOService.emitLastPumpHistorical(
    //   pumpHistorical
    // );
  }

  async delete(id: string) {
    rejectIfNotAuthorized(this, RuleName.Delete);
    const doc = await pumpHistoricalRepository.remove(id);
    return doc;
  }

  async get(id: string) {
    rejectIfNotAuthorized(this, RuleName.Get);
    const doc = await pumpHistoricalRepository.find(id);
    return doc;
  }
}