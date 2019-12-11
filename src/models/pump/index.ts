import { Model } from '../model';
import { RoleName } from '../../interfaces/entities/role-name';
import { AuthData } from '../../interfaces/auth-data';
import { Pump } from '../../interfaces/entities/pump';
import { rejectIfNotAuthorized } from '../../helpers/model';
import { PaginationRequest } from '../../lib/pagination/request';
import * as pumpValidator from '../../validation/pump';
import { pumpRepository } from './repository';

enum RuleName {
  AddPump = 'pump.add',
  Update = 'pump.update',
  Delete = 'pump.delete',
  FetchAll = 'pump.fetchAll',
  Get = 'pump.get'
}

export class PumpModel implements Model {
  rules: Map<string, Set<RoleName>>;
  authData: AuthData;

  constructor(authData: AuthData) {
    this.authData = authData;
    this.rules = new Map([
      [RuleName.AddPump, new Set([RoleName.Admin])],
      [RuleName.Update, new Set([RoleName.Admin])],
      [RuleName.Delete, new Set([RoleName.Admin])],
      [RuleName.FetchAll, new Set([RoleName.Admin, RoleName.Observer])],
      [RuleName.Get, new Set([RoleName.Admin, RoleName.Observer])]
    ]);
  }
  async add(data: Pump) {
    rejectIfNotAuthorized(this, RuleName.AddPump);
    await pumpValidator.validate(data, false);
    const doc = await pumpRepository.create(data);
    return doc;
  }
  async update(data: Pump) {
    rejectIfNotAuthorized(this, RuleName.Update);
    await pumpValidator.validate(data);
    const doc = await pumpRepository.update(data);
    return doc;
  }
  async delete(id: string) {
    rejectIfNotAuthorized(this, RuleName.Delete);
    const doc = await pumpRepository.remove(id);
    return doc;
  }
  async fetchAll(pagination?: PaginationRequest) {
    rejectIfNotAuthorized(this, RuleName.FetchAll);
    const docs = await pumpRepository.findAll(pagination);
    return docs;
  }
  async get(id: string) {
    rejectIfNotAuthorized(this, RuleName.Get);
    const doc = await pumpRepository.find(id);
    return doc;
  }
}
