import { RoleName } from "../../models/role-name";

export class GraphqlAuthz {
  private authz;

  constructor() {
    this.authz = {};
  }

  addAuthorization(functionName: string, roleNames: RoleName[]) {
    this.authz[functionName] = roleNames;
  }

  isAuthorized(functionName: string, roleName: RoleName) {
    const functionAuth: RoleName[] = this.authz[functionName];
    if (!functionAuth) {
      return false;
    }
    const authzFound = functionAuth.some(a => a === roleName);
    return authzFound;
  }
}
