import { AuthData } from "../lib/auth-data";
import { RoleName } from "./role-name";

export interface Model {
  rules: Map<string, Set<RoleName>>;
  authData: AuthData;
}
