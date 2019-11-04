import { Next, Response } from "restify";
import { HttpMethod } from "../../services/authz.service/http-method";
import { DataErrorName } from "../../lib/errors/data-error";

class DataHandler {
  canBeHandled(err: Error) {
    return err.name in DataErrorName;
  }

  handleJson(res: Response, next: Next, httpMethod: string, data: any) {
    let status = 200;
    if (!data) {
      status = 204;
    }
    if (httpMethod === HttpMethod.Post) {
      status = 201;
    }
    res.send(status, data);
    return next();
  }
}

export const dataHandler: DataHandler = new DataHandler();
