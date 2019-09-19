import * as common from "@/validation/rules/common";

export const IdRegex = common.IdRegex;
export const NameRegex = /^[A-Za-z0-9_ .,-\[\]]+[ªº]?[A-Za-z0-9_ .,-\[\]]*$/;
export const PasswordRegex = /[^ ]+/;
export const EmailRegex = common.EmailRegex;
export const FacebookIdRegex = /[^ ]+/;
export const GoogleIdRegex = /[^ ]+/;
