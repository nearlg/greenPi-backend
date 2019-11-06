import { EnvironmentResolver } from "./environment-resolver";

const resolver: EnvironmentResolver = {
  async addEnvironment(args, context) {
    const doc = await context.models.environment.add(args.environmentData);
    return doc;
  },
  async deleteEnvironment(args, context) {
    const doc = await context.models.environment.delete(args.id);
    return doc;
  },
  async fetchEnvironments(args, context) {
    const doc = await context.models.environment.fetchAll();
    return doc;
  },
  async getEnvironment(args, context) {
    const doc = await context.models.environment.get(args.id);
    return doc;
  },
  async updateEnvironment(args, context) {
    const doc = await context.models.environment.update(args.environmentData);
    return doc;
  }
};

export default resolver;
