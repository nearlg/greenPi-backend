import { RoleName } from '../../interfaces/entities/role-name';
import { Model } from '../../models/model';
import { AuthErrorName } from '../../lib/errors/auth-error/auth-error-name';

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
    const err = new Error('Query not authorized');
    err.name = AuthErrorName.NotAuthorizedError;
    throw err;
  }
}
