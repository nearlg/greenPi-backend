import { HttpMethod } from './http-method';
import { RoleName } from './role-name';

export const rulesData = new Map([
    ['/environments', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/environments/:id', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/measures', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/measures/', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/measures/:id', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/pump-historicals', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/pump-historicals/', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/pump-historicals/:id', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/pumps', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/pumps/:id', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/sensor-types', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/sensor-types/:id', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/sensors', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/sensors/:id', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        }
    ]],
    ['/users/profile', [
        {
            httpMethod: HttpMethod.Get,
            roleNames: [ RoleName.Admin, RoleName.Observer ]
        },
        {
            httpMethod: HttpMethod.Post,
            roleNames: [ RoleName.NonRegistered ]
        }
    ]],
    ['/users/profile/sign-in/local', [
        {
            httpMethod: HttpMethod.Post,
            roleNames: [ RoleName.NonRegistered ]
        }
    ]],
    ['/users/profile/sign-in/google', [
        {
            httpMethod: HttpMethod.Post,
            roleNames: [ RoleName.NonRegistered ]
        }
    ]]
]);
