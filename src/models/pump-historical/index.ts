import { Model } from '../model';
import { AuthData } from '../../interfaces/auth-data';
import * as pumpHistoricalValidator from '../../validation/pump-historical';
import { PaginationRequest } from '../../lib/pagination/request';
import { FetchCriteria } from './fetch-criteria';
import { FetchBy } from './fetch-by';
import { PumpHistoricalPagedData } from './pump-historical-paged-data';
import { RoleName } from '../../interfaces/entities/role-name';
import { PumpHistorical } from '../../interfaces/entities/pump-historical';
import { Pump } from '../../interfaces/entities/pump';
import { rejectIfNotAuthorized } from '../../helpers/model';
import { environmentRepository } from '../environment/repository';
import { FindAllOptions } from './repository/find-all-options';
import { pumpHistoricalRepository } from './repository';
import { pumpRepository } from '../pump/repository';
import { PagedData } from '../../lib/pagination/paged-data';

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

  private static populateItems(
    pumps: Pump[],
    pagedData: PagedData<PumpHistorical>
  ) {
    // Obtein an object with all the items by id as a fieldName.
    // this makes easier to get access to the item by its 'id'
    const sensorsById = pumps.reduce((obj, pump) => {
      return { ...obj, [pump.id]: pump };
    }, {});
    pagedData.items.map(item => {
      const pumpId = item.pump + '';
      const pump = sensorsById[pumpId];
      if (pump) {
        item.pump = pump;
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
    const pumpIds = (<Pump[]>environment.pumps).map(p => <string>p.id);
    const options: FindAllOptions = {
      filter: criteria.filter,
      paginationRequest
    };
    const docs = await pumpHistoricalRepository.findAllByPumpIds(
      pumpIds,
      options
    );
    PumpHistoricalModel.populateItems(<Pump[]>environment.pumps, docs);
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
    // Because the items are fetched by sensorId, it is not necessary
    // to populate the pump in all the items. It is suppose that the
    // frontend has the pump already populated
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
