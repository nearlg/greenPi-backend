import * as measureValidator from "../../../../validation/measure";
import { MeasureResolver } from "./measure-resolver";
import { validateDependencies } from "./helpers";
import {
  measureRepository,
  sensorRepository,
  environmentRepository
} from "../../../../repositories";
// import { socketIOService } from "../../../services/socket-io.service";
import { FilterBy } from "./filter-by";
import { Sensor } from "../../../../models/interface/sensor";

async function fetchBySensorId(
  id: string,
  lte: Date = null,
  gte: Date = null,
  sortBy?: string
) {
  await sensorRepository.find(id);
  const measures = await measureRepository.findAllBySensorId(
    id,
    sortBy,
    gte,
    lte
  );
  return measures;
}

async function fetchByEnvironmentId(
  id: string,
  lte: Date = null,
  gte: Date = null,
  sortBy?: string
) {
  const environment = await environmentRepository.find(id);
  const measures = await measureRepository.findAllBySensors(
    <Array<Sensor>>environment.sensors,
    sortBy,
    gte,
    lte
  );
  return measures;
}

const resolver: MeasureResolver = {
  async addMeasure(args, req) {
    const date = args.measureData.date ? args.measureData.date : new Date();
    const measureData = { ...args.measureData, date };
    const doc = await measureValidator.validate(measureData, false);
    await validateDependencies(doc);
    const measure = await measureRepository.create(doc);
    return measure;
    // TODO
    // await socketIOService.sensorsSIOService.emitLastMeasure(measure);
  },
  async deleteMeasure(args, req) {
    const measure = await measureRepository.remove(args.id);
    return measure;
  },
  async fetchMeasures(args, req) {
    const filter = args.filter;
    if (!filter || !(filter.by in FilterBy)) {
      const measures = measureRepository.findAll();
      return measures;
    }

    const id = args.filter.id;
    const lte = filter.lte ? new Date(filter.lte) : null;
    const gte = filter.gte ? new Date(filter.gte) : null;
    const sortBy = args.filter.sortBy;

    if (filter.by === FilterBy.SensorId) {
      return fetchBySensorId(id, lte, gte, sortBy);
    }

    if (filter.by === FilterBy.EnvironmentId) {
      return fetchByEnvironmentId(id, lte, gte, sortBy);
    }
  },
  async getMeasure(args, req) {
    const measure = await measureRepository.find(args.id);
    return measure;
  }
};

export default resolver;
