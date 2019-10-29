export interface UpdateEnvironmentArgs {
  id: string;
  name: string;
  description: string;
  sensors: string[];
  pumps: string[];
}
