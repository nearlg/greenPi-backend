import { RoleName } from "./role-name";
import { AuthErrorName } from "../lib/errors/auth-error";
import { Model } from "./model";

function isAuthorized(
  rules: Map<string, Set<RoleName>>,
  resource: string,
  roleName: RoleName
) {
  const roleNames = rules.get(resource);
  const authzFound = roleNames && roleNames.has(roleName);
  return authzFound;
}

export function rejectIfNotAuthorized(model: Model, resource: string) {
  const rules = model.rules;
  const roleName = model.authData.roleName;
  if (!isAuthorized(rules, resource, roleName)) {
    const err = new Error("Query not authorized");
    err.name = AuthErrorName.NotAuthorizedError;
    throw err;
  }
}
