import { PumpHistorical } from "../../../../models/entities/pump-historical";
import { Pump } from "../../../../models/entities/pump";
import { pumpRepository } from "../../../../models/repositories";

export async function validateDependencies(
  pumpHistorical: PumpHistorical
): Promise<PumpHistorical> {
  const pumpId: string =
    (<Pump>pumpHistorical.pump).id || <string>pumpHistorical.pump;
  await pumpRepository.find(pumpId);
  return pumpHistorical;
}
