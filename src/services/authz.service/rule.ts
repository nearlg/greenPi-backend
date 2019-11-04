import { RoleName } from "../../models/role-name";
import { HttpMethod } from "./http-method";

export interface Rule {
  httpMethod: HttpMethod;
  roleNames: RoleName[];
}
