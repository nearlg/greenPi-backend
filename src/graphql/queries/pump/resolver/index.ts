import { Request } from "restify";
import * as pumpValidator from "../../../../validation/pump";
import { PumpResolver } from "./pump-resolver";
import { pumpRepository } from "../../../../models/repositories";
import { rejectIfNotAuthorized } from "../../../helpers";
import rules from "../authoriation-rules";

const resolver: PumpResolver = {
  async addPump(args, req) {
    await rejectIfNotAuthorized(req, rules, "addPump");
    const pump = await pumpValidator.validate(args.pumpData, false);
    await pumpRepository.create(pump);
    return pump;
  },
  async deletePump(args, req) {
    await rejectIfNotAuthorized(req, rules, "deletePump");
    const pump = await pumpRepository.remove(args.id);
    return pump;
  },
  async fetchPumps(args, req) {
    await rejectIfNotAuthorized(req, rules, "fetchPumps");
    const pumps = await pumpRepository.findAll();
    return pumps;
  },
  async getPump(args, req) {
    await rejectIfNotAuthorized(req, rules, "getPump");
    const pump = await pumpRepository.find(req.params.id);
    return pump;
  },
  async updatePump(args, req) {
    await rejectIfNotAuthorized(req, rules, "updatePump");
    const pump = await pumpValidator.validate(args.pumpData);
    await pumpRepository.update(pump);
    return pump;
  }
};

export default resolver;
