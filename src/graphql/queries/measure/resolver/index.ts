import { MeasureResolver } from "./measure-resolver";
import { FilterBy } from "./filter-by";
// import { socketIOService } from "../../../services/socket-io.service";

const resolver: MeasureResolver = {
  async addMeasure(args, context) {
    const date = args.measureData.date || new Date();
    const data = { ...args.measureData, date };
    const doc = await context.models.measure.add(data);
    return doc;
    // TODO: implement socketIO
    // await socketIOService.sensorsSIOService.emitLastMeasure(measure);
  },
  async deleteMeasure(args, context) {
    const doc = await context.models.measure.delete(args.id);
    return doc;
  },
  async fetchMeasures(args, context) {
    if (args.by === FilterBy.SensorId) {
      return context.models.measure.FetchBySensorId(args.id, args.filter);
    }
    if (args.by === FilterBy.EnvironmentId) {
      return context.models.measure.FetchByEnvironmentId(args.id, args.filter);
    }
  },
  async getMeasure(args, context) {
    const doc = await context.models.measure.get(args.id);
    return doc;
  }
};

export default resolver;
