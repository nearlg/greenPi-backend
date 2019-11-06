import { Model } from "./model";
import { PumpHistorical } from "./entities/pump-historical";
import { RoleName } from "./role-name";
import {
  pumpHistoricalRepository,
  pumpRepository,
  environmentRepository
} from "./repositories";
import { rejectIfNotAuthorized } from "./helpers";
import { AuthData } from "../lib/auth-data";
import * as pumpHistoricalValidator from "../validation/pump-historical";
import { Pump } from "./entities/pump";

enum RuleName {
  Add = "pumpHistorical.add",
  Delete = "pumpHistorical.delete",
  FetchByEnvironmentId = "pumpHistorical.fetchByEnvironmentId",
  FetchByPumpId = "pumpHistorical.fetchByPumpId",
  Get = "pumpHistorical.getSensor"
}

export interface FetchFilter {
  gte?: Date;
  lte?: Date;
  sortBy?: string;
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

  async FetchByEnvironmentId(id: string, filter?: FetchFilter) {
    rejectIfNotAuthorized(this, RuleName.FetchByEnvironmentId);
    const gte = filter && filter.gte ? new Date(filter.gte) : null;
    const lte = filter && filter.lte ? new Date(filter.lte) : null;
    const sortBy: string = filter ? filter.sortBy : null;
    const environment = await environmentRepository.find(id);
    const pumpIds = (<Pump[]>environment.pumps).map(p => <string>p.id);
    const docs = pumpHistoricalRepository.findAllByPumpIds(
      pumpIds,
      sortBy,
      gte,
      lte
    );
    return docs;
  }

  async FetchByPumpId(id: string, filter?: FetchFilter) {
    rejectIfNotAuthorized(this, RuleName.FetchByPumpId);
    const gte = filter && filter.gte ? new Date(filter.gte) : null;
    const lte = filter && filter.lte ? new Date(filter.lte) : null;
    const sortBy: string = filter ? filter.sortBy : null;
    await pumpRepository.find(id);
    const docs = await pumpHistoricalRepository.findAllByPumpId(
      id,
      sortBy,
      gte,
      lte
    );
    return docs;
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
