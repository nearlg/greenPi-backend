import { Unit } from '../../../../../interfaces/entities/unit';

export interface AddSensorTypeArgs {
  name: string;
  description: string;
  unit: Unit;
}
