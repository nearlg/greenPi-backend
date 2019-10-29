import { Request } from "restify";
import { Environment } from "../../../../models/interface/environment";
import { AddEnvironmentArgs } from "./args/add-environment-args";
import { UpdateEnvironmentArgs } from "./args/update-environment-args";

export interface EnvironmentResolver {
  addEnvironment(
    args: { environmentData: AddEnvironmentArgs },
    req: Request
  ): Promise<Environment>;
  updateEnvironment(
    args: { environmentData: UpdateEnvironmentArgs },
    req: Request
  ): Promise<Environment>;
  deleteEnvironment(args: { id: string }, req: Request): Promise<Environment>;
  fetchEnvironments(args: {}, req: Request): Promise<Environment[]>;
  getEnvironment(args: { id: string }, req: Request): Promise<Environment>;
}
