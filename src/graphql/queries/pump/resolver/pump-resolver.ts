import { Pump } from "../../../../models/entities/pump";
import { AddPumpArgs } from "./args/add-pump-args";
import { UpdatePumpArgs } from "./args/update-pump-args";
import { GraphqlContext } from "../../../graphql-context";

export interface PumpResolver {
  addPump(
    args: { pumpData: AddPumpArgs },
    context: GraphqlContext
  ): Promise<Pump>;
  updatePump(
    args: { pumpData: UpdatePumpArgs },
    context: GraphqlContext
  ): Promise<Pump>;
  deletePump(args: { id: string }, context: GraphqlContext): Promise<Pump>;
  fetchPumps(args: {}, context: GraphqlContext): Promise<Pump[]>;
  getPump(args: { id: string }, context: GraphqlContext): Promise<Pump>;
}
