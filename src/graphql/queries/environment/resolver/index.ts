import * as environmentValidator from "../../../../validation/environment";
import { EnvironmentResolver } from "./environment-resolver";
import { environmentRepository } from "../../../../models/repositories";

const resolver: EnvironmentResolver = {
  async addEnvironment(args, req) {
    const doc = await environmentValidator.validate(
      args.environmentData,
      false
    );
    const environment = await environmentRepository.create(doc);
    return environment;
  },
  async deleteEnvironment(args, req) {
    const environment = await environmentRepository.remove(args.id);
    return environment;
  },
  async fetchEnvironments(args, req) {
    const environments = await environmentRepository.findAll();
    return environments;
  },
  async getEnvironment(args, req) {
    const environment = await environmentRepository.find(args.id);
    return environment;
  },
  async updateEnvironment(args, req) {
    const doc = await environmentValidator.validate(
      args.environmentData,
      false
    );
    const environment = await environmentRepository.update(doc);
    return environment;
  }
};

export default resolver;
