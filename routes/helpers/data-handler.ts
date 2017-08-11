import { Next, Response } from "restify";

class DataHandler {
    handleJson(data: any, res: Response, next: Next, status: number = 200): void {
        if(!data){
            res.send(204, data);
            return;
        }
        res.send(status, data);
        next();
    }
}

export const dataHandler: DataHandler = new DataHandler();