import { PumpHistoricalResolver } from './pump-historical-resolver';
// import { socketIOService } from "../../../services/socket-io.service";

const resolver: PumpHistoricalResolver = {
  async addPumpHistorical(args, context) {
    const date = new Date(args.pumpHistoricalData.date) || new Date();
    const data = { ...args.pumpHistoricalData, date };
    const doc = await context.models.pumpHistorical.add(data);
    return doc;
    // TODO: implement socketIO
    // await socketIOService.pumpsSIOService.emitLastPumpHistorical(
    //   pumpHistorical
    // );
  },
  async deletePumpHistorical(args, context) {
    const doc = await context.models.pumpHistorical.delete(args.id);
    return doc;
  },
  async fetchPumpHistoricals(args, context) {
    return context.models.pumpHistorical.fetchBy(
      args.criteria,
      args.paginationRequest
    );
  },
  async getPumpHistorical(args, context) {
    const doc = await context.models.pumpHistorical.get(args.id);
    return doc;
  }
};

export default resolver;
