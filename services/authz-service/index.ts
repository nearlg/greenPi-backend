import { Rule } from "./rule";
import { RoleName } from "./role-name";
import * as Config from "../../config";

class Authz {

    private rules: Rule[];

    constructor() {
        this.setRules();
    }

    isAuthorized(path: string, roleName: RoleName): Promise<boolean> {
        /**
         * If the path does not exist in 'rules', the role-name is admin
         */
        const rule = this.getRule(path);
        const roleNames = rule ? rule.RoleNames : [ RoleName.Admin ];
        const roleNameFound = roleNames.find(r => r === roleName);
        const isAuthorized = roleNameFound != undefined;
        return Promise.resolve(isAuthorized);
    }

    private getRule(path: string): Rule {
        const rule = this.rules.find(rule => rule.path === path);
        return rule;
    }

    private setRules() {
        const apiRoute = this.getApiRoute();
        this.rules = [
            {
                path: apiRoute + '/users/sign-up',
                RoleNames: [ RoleName.NonRegistered ]
            },
            {
                path: apiRoute + '/users/sign-in',
                RoleNames: [ RoleName.NonRegistered ]
            }
        ];
    }

    private getApiRoute() {
        const apiVersion = Config.Server.VERSION.split('.');
        const apiRoute = '/api/v' + apiVersion[0];
        return apiRoute;
    }
}

export const authzService = new Authz();
