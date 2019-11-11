import { name, version } from "../../package.json";

export const PORT: number = Number(process.env.PORT) || 8080;
export const NAME: string = process.env.SERVER_NAME || name;
export const VERSION: string = version;
export const ENVIRONMENT: string = process.env.NODE_ENV || "development";
export const ALLOW_CROSS_ORIGIN: boolean = process.env.ALLOW_CROSS_ORIGIN ?
  Boolean(process.env.ALLOW_CROSS_ORIGIN) :
  ENVIRONMENT === "development";
