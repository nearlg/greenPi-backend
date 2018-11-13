import { EmailRegex as EmailRegExp } from './common';

export const NameRegex: RegExp = /^[A-Za-z0-9_ .,-\[\]]+[ªº]?[A-Za-z0-9_ .,-\[\]]*$/;
export const PasswordRegex: RegExp = /[^ ]+/;
export const EmailRegex: RegExp = EmailRegExp;
export const FacebookIdRegex: RegExp = /[^ ]+/;
export const GoogleIdRegex: RegExp = /[^ ]+/;
