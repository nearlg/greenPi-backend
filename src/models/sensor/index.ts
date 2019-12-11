import * as sensorValidator from '../../validation/sensor';
import { Model } from '../model';
import { RoleName } from '../../interfaces/entities/role-name';
import { AuthData } from '../../interfaces/auth-data';
import { Sensor } from '../../interfaces/entities/sensor';
import { sensorRepository } from './repository';
import { rejectIfNotAuthorized } from '../../helpers/model';
import { PaginationRequest } from '../../lib/pagination/request';
import { SensorType } from '../../interfaces/entities/sensor-type';
import { sensorTypeRepository } from '../sensor-type/repository';

enum RuleName {
  Add = 'pump.add',
  Update = 'pump.update',
  Delete = 'pump.delete',
  FetchAll = 'pump.fetchAll',
  Get = 'pump.get'
}

export class SensorModel implements Model {
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

  async add(data: Sensor) {
    await sensorValidator.validate(data, false);
    await this.validateDependencies(data);
    const doc = await sensorRepository.create(data);
    return doc;
  }

  async update(data: Sensor) {
    rejectIfNotAuthorized(this, RuleName.Add);
    await sensorValidator.validate(data);
    await this.validateDependencies(data);
    const doc = await sensorRepository.update(data);
    return doc;
  }

  async delete(id: string) {
    rejectIfNotAuthorized(this, RuleName.Delete);
    const doc = sensorRepository.remove(id);
    return doc;
  }

  async fetchAll(pagination?: PaginationRequest) {
    rejectIfNotAuthorized(this, RuleName.FetchAll);
    const docs = await sensorRepository.findAll(pagination);
    return docs;
  }

  async get(id: string) {
    rejectIfNotAuthorized(this, RuleName.Get);
    const doc = await sensorRepository.find(id);
    return doc;
  }

  private async validateDependencies(sensor: Sensor): Promise<Sensor> {
    const sensorTypeId: string =
      (<SensorType>sensor.type).name || <string>sensor.type;
    await sensorTypeRepository.find(sensorTypeId);
    return sensor;
  }
}
