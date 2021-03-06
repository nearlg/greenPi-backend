import { Model } from '../model';
import { RoleName } from '../../interfaces/entities/role-name';
import { AuthData } from '../../interfaces/auth-data';
import { SensorType } from '../../interfaces/entities/sensor-type';
import { rejectIfNotAuthorized } from '../../helpers/model';
import { sensorTypeRepository } from './repository';
import { PaginationRequest } from '../../lib/pagination/request';
import * as sensorTypeValidator from '../../validation/sensor-type';

enum RuleName {
  Add = 'pump.add',
  Update = 'pump.update',
  Delete = 'pump.delete',
  FetchAll = 'pump.fetchAll',
  Get = 'pump.get'
}

export class SensorTypeModel implements Model {
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

  async add(data: SensorType) {
    rejectIfNotAuthorized(this, RuleName.Add);
    await sensorTypeValidator.validate(data, false);
    const doc = await sensorTypeRepository.create(data);
    return doc;
  }

  async update(data: SensorType) {
    rejectIfNotAuthorized(this, RuleName.Update);
    await sensorTypeValidator.validate(data);
    const doc = await sensorTypeRepository.update(data);
    return doc;
  }

  async delete(id: string) {
    rejectIfNotAuthorized(this, RuleName.Delete);
    const doc = await sensorTypeRepository.remove(id);
    return doc;
  }

  async fetchAll(pagination?: PaginationRequest) {
    rejectIfNotAuthorized(this, RuleName.FetchAll);
    const docs = await sensorTypeRepository.findAll(pagination);
    return docs;
  }

  async get(id: string) {
    rejectIfNotAuthorized(this, RuleName.Get);
    const doc = await sensorTypeRepository.find(id);
    return doc;
  }
}
