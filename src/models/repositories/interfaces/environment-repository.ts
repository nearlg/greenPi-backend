import { Repository } from "./repository";
import { Environment } from "../../entities/environment";

export interface EnvironmentRepository extends Repository<Environment> {
  find(id: string): Promise<Environment>;
  remove(id: string): Promise<Environment>;
}
