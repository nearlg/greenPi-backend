import { Model } from '../model';
import { RoleName } from '../../interfaces/entities/role-name';
import { AuthData } from '../../interfaces/auth-data';
import { Environment } from '../../interfaces/entities/environment';
import { rejectIfNotAuthorized } from '../../helpers/model';
import { PaginationRequest } from '../../lib/pagination/request';
import * as environmentValidator from '../../validation/environment';
import { environmentRepository } from './repository';

enum RuleName {
  Add = 'environment.add',
  Update = 'environment.update',
  Delete = 'environment.delete',
  FetchAll = 'environment.fetchAll',
  Get = 'environment.get'
}

export class EnvironmentModel implements Model {
  rules: Map<string, Set<RoleName>>;
  authData: AuthData;

  constructor(authData: AuthData) {
    this.authData = authData;
    this.rules = new Map([
      [RuleName.Add, new Set([RoleName.Admin])],
      [RuleName.Update, new Set([RoleName.Admin])],
      [RuleName.Delete, new Set([RoleName.Admin])],
      [RuleName.FetchAll, new Set([RoleName.Admin, RoleName.Observer])],
      [RuleName.Get, new Set([RoleName.Admin, RoleName.Observer])]
    ]);
  }

  async add(data: Environment) {
    rejectIfNotAuthorized(this, RuleName.Add);
    await environmentValidator.validate(data, false);
    const doc = await environmentRepository.create(data);
    return doc;
  }

  async update(data: Environment) {
    rejectIfNotAuthorized(this, RuleName.Update);
    await environmentValidator.validate(data, false);
    const doc = await environmentRepository.update(data);
    return doc;
  }

  async delete(id: string) {
    rejectIfNotAuthorized(this, RuleName.Delete);
    const doc = await environmentRepository.remove(id);
    return doc;
  }

  async fetchAll(pagination: PaginationRequest) {
    rejectIfNotAuthorized(this, RuleName.FetchAll);
    const docs = await environmentRepository.findAll(pagination);
    return docs;
  }

  async get(id: string) {
    rejectIfNotAuthorized(this, RuleName.Get);
    const doc = await environmentRepository.find(id);
    return doc;
  }
}
