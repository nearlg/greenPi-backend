import { Request } from "restify";
import { Pump } from "../../../../models/interface/pump";
import { AddPumpArgs } from "./args/add-pump-args";
import { UpdatePumpArgs } from "./args/update-pump-args";

export interface PumpResolver {
  addPump(args: { pumpData: AddPumpArgs }, req: Request): Promise<Pump>;
  updatePump(args: { pumpData: UpdatePumpArgs }, req: Request): Promise<Pump>;
  deletePump(args: { id: string }, req: Request): Promise<Pump>;
  fetchPumps(args: {}, req: Request): Promise<Pump[]>;
  getPump(args: { id: string }, req: Request): Promise<Pump>;
}
