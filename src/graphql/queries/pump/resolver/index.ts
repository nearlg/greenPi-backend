import { PumpResolver } from "./pump-resolver";

const resolver: PumpResolver = {
  async addPump(args, context) {
    const doc = await context.models.pump.add(args.pumpData);
    return doc;
  },
  async deletePump(args, context) {
    const doc = await context.models.pump.delete(args.id);
    return doc;
  },
  async fetchPumps(args, context) {
    const docs = await context.models.pump.fetchAll(args.pagination);
    return docs;
  },
  async getPump(args, context) {
    const doc = await context.models.pump.get(args.id);
    return doc;
  },
  async updatePump(args, context) {
    const doc = context.models.pump.update(args.pumpData);
    return doc;
  }
};

export default resolver;
