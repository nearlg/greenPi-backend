import * as common from './common';

export const IdRegex = common.IdRegex;
export const NameRegex = common.NameRegex;
export const DescriptionRegex = common.DescriptionRegex;
export const UnitNameRegex = /^[A-Za-z0-9_ .,-\[\]]+[ªº]?[A-Za-z0-9_ .,-\[\]]*$/;
export const UnitDescriptionRegex = common.DescriptionRegex;
