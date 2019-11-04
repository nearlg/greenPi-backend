import * as pumpHistoricalValidator from "../../../../validation/pump-historical";
import { PumpHistoricalResolver } from "./pump-historical-resolver";
import {
  pumpHistoricalRepository,
  pumpRepository,
  environmentRepository
} from "../../../../models/repositories";
import { validateDependencies } from "./helpers";
import { FilterBy } from "./filter-by";
import { Pump } from "../../../../models/entities/pump";
import { PumpMongooseRepository } from "../../../../models/repositories/mongoose4/pump-repository";
// import { socketIOService } from "../../../services/socket-io.service";

async function fetchByPumpId(
  id: string,
  lte: Date = null,
  gte: Date = null,
  sortBy?: string
) {
  await pumpRepository.find(id);
  const pumpHistoricals = await pumpHistoricalRepository.findAllByPumpId(
    id,
    sortBy,
    gte,
    lte
  );
  return pumpHistoricals;
}

async function fetchByEnvironmentId(
  id: string,
  lte: Date = null,
  gte: Date = null,
  sortBy?: string
) {
  const environment = await environmentRepository.find(id);
  const pumpIds: string[] = (<Array<Pump>>environment.pumps).map(s => s.id);
  const pumpHistoricals = await pumpHistoricalRepository.findAllByPumpIds(
    pumpIds,
    sortBy,
    gte,
    lte
  );
  return pumpHistoricals;
}

const resolver: PumpHistoricalResolver = {
  async addPumpHistorical(args, req) {
    const date = args.pumpHistoricalData.date
      ? args.pumpHistoricalData.date
      : new Date();
    const pumpHistoricalData = { ...args.pumpHistoricalData, date };
    const doc = await pumpHistoricalValidator.validate(
      pumpHistoricalData,
      false
    );
    await validateDependencies(doc);
    const pumpHistorical = await pumpHistoricalRepository.create(doc);
    return pumpHistorical;
    // TODO: implement socketIO
    // await socketIOService.pumpsSIOService.emitLastPumpHistorical(
    //   pumpHistorical
    // );
  },
  async deletePumpHistorical(args, req) {
    const pumpHistorical = await pumpHistoricalRepository.remove(args.id);
    return pumpHistorical;
  },
  async fetchPumpHistorical(args, req) {
    const filter = args.filter;
    if (!filter || !(filter.by in FilterBy)) {
      const pumpHistoricals = pumpHistoricalRepository.findAll();
      return pumpHistoricals;
    }

    const id = args.filter.id;
    const lte = filter.lte ? new Date(filter.lte) : null;
    const gte = filter.gte ? new Date(filter.gte) : null;
    const sortBy = args.filter.sortBy;

    if (filter.by === FilterBy.PumpId) {
      return fetchByPumpId(id, lte, gte, sortBy);
    }

    if (filter.by === FilterBy.EnvironmentId) {
      return fetchByEnvironmentId(id, lte, gte, sortBy);
    }
  },
  async getPumpHistorical(args, req) {
    const pumpHistorical = await pumpHistoricalRepository.find(args.id);
    return pumpHistorical;
  }
};

export default resolver;
