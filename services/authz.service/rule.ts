import { RoleName } from "@/services/authz.service/role-name";
import { HttpMethod } from "@/services/authz.service/http-method";

export interface Rule {
  httpMethod: HttpMethod;
  roleNames: RoleName[];
}
