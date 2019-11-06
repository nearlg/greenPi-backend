import * as pumpHistoricalValidator from "../../../../validation/pump-historical";
import { PumpHistoricalResolver } from "./pump-historical-resolver";
import { validateDependencies } from "./helpers";
import { FilterBy } from "./filter-by";
// import { socketIOService } from "../../../services/socket-io.service";

const resolver: PumpHistoricalResolver = {
  async addPumpHistorical(args, context) {
    const date = args.pumpHistoricalData.date || new Date();
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
  async fetchPumpHistorical(args, context) {
    if (args.by === FilterBy.PumpId) {
      return context.models.pumpHistorical.FetchByPumpId(args.id, args.filter);
    }
    if (args.by === FilterBy.EnvironmentId) {
      return context.models.pumpHistorical.FetchByEnvironmentId(
        args.id,
        args.filter
      );
    }
  },
  async getPumpHistorical(args, context) {
    const doc = await context.models.pumpHistorical.get(args.id);
    return doc;
  }
};

export default resolver;
