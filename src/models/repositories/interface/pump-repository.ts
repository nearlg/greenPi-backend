import { Repository } from "./repository";
import { Pump } from "../../entities/pump";

export interface PumpRepository extends Repository<Pump> {
  find(id: string): Promise<Pump>;
  remove(id: string): Promise<Pump>;
}
