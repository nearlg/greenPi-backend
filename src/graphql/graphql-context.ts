import { Request } from "restify";
import { Models } from "../models/models";

export interface GraphqlContext {
  req: Request;
  models: Models;
}
