import { RoleName } from "../../../models/role-name";
import { GraphqlAuthz } from "../../helpers/graphql-authz";

const rules = new GraphqlAuthz();
const allRoles = [RoleName.NonRegistered, RoleName.Observer, RoleName.Admin];
rules.addAuthorization("addPump", allRoles);
rules.addAuthorization("fetchPumps", allRoles);
rules.addAuthorization("deletePump", allRoles);
rules.addAuthorization("getPump", allRoles);
rules.addAuthorization("updatePump", allRoles);
export default rules;
