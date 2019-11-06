import { Model } from "./model";
import { Sensor } from "./entities/sensor";
import { RoleName } from "./role-name";
import { sensorRepository, sensorTypeRepository } from "./repositories";
import { rejectIfNotAuthorized } from "./helpers";
import { AuthData } from "../lib/auth-data";
import * as sensorValidator from "../validation/sensor";
import { SensorType } from "./entities/sensor-type";

enum RuleName {
  Add = "pump.add",
  Update = "pump.update",
  Delete = "pump.delete",
  FetchAll = "pump.fetchAll",
  Get = "pump.get"
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

  async fetchAll() {
    rejectIfNotAuthorized(this, RuleName.FetchAll);
    const docs = await sensorRepository.findAll();
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
