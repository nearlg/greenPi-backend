import { Model } from "./model";
import { Measure } from "./entities/measure";
import { RoleName } from "./role-name";
import {
  measureRepository,
  sensorRepository,
  environmentRepository
} from "./repositories";
import { rejectIfNotAuthorized } from "./helpers";
import { AuthData } from "../lib/auth-data";
import * as measureValidator from "../validation/measure";
import { Sensor } from "./entities/sensor";
import { PaginationRequest } from "../lib/pagination/request";
import { FindAllFilter } from "./repositories/interfaces/measure-repository";

enum RuleName {
  Add = "measure.addSensor",
  Delete = "measure.delete",
  FetchByEnvironmentId = "measure.fetchByEnvironmentId",
  FetchBySensorId = "measure.fetchBySensorId",
  Get = "measure.get"
}

export interface FetchFilter extends FindAllFilter {}

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

  async fetchByEnvironmentId(
    id: string,
    pagination?: PaginationRequest,
    filter?: FetchFilter
  ) {
    rejectIfNotAuthorized(this, RuleName.FetchByEnvironmentId);
    const environment = await environmentRepository.find(id);
    const sensorIds = (<Sensor[]>environment.sensors).map(s => <string>s.id);
    const docs = await measureRepository.findAllBySensorIds(
      sensorIds,
      pagination,
      filter
    );
    return docs;
  }

  async fetchBySensorId(
    id: string,
    pagination?: PaginationRequest,
    filter?: FetchFilter
  ) {
    rejectIfNotAuthorized(this, RuleName.FetchBySensorId);
    await sensorRepository.find(id);
    const docs = await measureRepository.findAllBySensorId(
      id,
      pagination,
      filter
    );
    return docs;
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
