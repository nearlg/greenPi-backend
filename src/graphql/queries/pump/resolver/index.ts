import * as pumpValidator from "../../../../validation/pump";
import { PumpResolver } from "./pump-resolver";
import { pumpRepository } from "../../../../repositories";

const resolver: PumpResolver = {
  async addPump(args, req) {
    const pump = await pumpValidator.validate(args.pumpData, false);
    await pumpRepository.create(pump);
    return pump;
  },
  async deletePump(args, req) {
    const pump = await pumpRepository.remove(args.id);
    return pump;
  },
  async fetchPumps(args, req) {
    const pumps = await pumpRepository.findAll();
    return pumps;
  },
  async getPump(args, req) {
    const pump = await pumpRepository.find(req.params.id);
    return pump;
  },
  async updatePump(args, req) {
    const pump = await pumpValidator.validate(args.pumpData);
    await pumpRepository.update(pump);
    return pump;
  }
};

export default resolver;
