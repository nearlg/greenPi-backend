import { Unit } from '../../../../../interfaces/entities/unit';

export interface UpdateSensorTypeArgs {
  id: string;
  name: string;
  description: string;
  unit: Unit;
}
