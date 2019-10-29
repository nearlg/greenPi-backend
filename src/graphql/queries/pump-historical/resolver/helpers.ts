import { PumpHistorical } from "../../../../models/interface/pump-historical";
import { Pump } from "../../../../models/interface/pump";
import { pumpRepository } from "../../../../repositories";

export async function validateDependencies(
  pumpHistorical: PumpHistorical
): Promise<PumpHistorical> {
  const pumpId: string =
    (<Pump>pumpHistorical.pump).id || <string>pumpHistorical.pump;
  await pumpRepository.find(pumpId);
  return pumpHistorical;
}
