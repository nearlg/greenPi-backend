export const IdRegex: RegExp = /^[a-z0-9]{10,24}$/; // example mongoDB id: 5977aab581e6572685b52b87
export const NameRegex: RegExp = /^[A-Za-z0-9_.,-\[\]]+$/;
export const DescriptionRegex: RegExp = /.*/;
export const PortRegex: RegExp = /\d+/;
// Complete precission: with milliseconds
export const DateRegex: RegExp = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/;