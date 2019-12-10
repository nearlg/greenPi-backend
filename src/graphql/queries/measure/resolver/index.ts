import { MeasureResolver } from './measure-resolver';
import { FilterBy } from './filter-by';
// import { socketIOService } from "../../../services/socket-io.service";

const resolver: MeasureResolver = {
  async addMeasure(args, context) {
    const date = new Date(args.measureData.date) || new Date();
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
    return context.models.measure.fetchBy(
      args.criteria,
      args.paginationRequest
    );
  },
  async getMeasure(args, context) {
    const doc = await context.models.measure.get(args.id);
    return doc;
  }
};

export default resolver;
