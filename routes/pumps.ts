import * as restify from "restify";
import * as Controller from "../controllers/pump";

export function routes(server: restify.Server, mainPath: string = ''): void{
    server.post(mainPath, Controller.addPump);
    // server.patch(mainPath, Controller.updatePump);
    server.patch(mainPath + '/:id', Controller.updatePumpById);
    // server.del(mainPath, Controller.deletePump);
    server.del(mainPath + '/:id', Controller.deletePumpById);
    server.get(mainPath, Controller.fetchPumps);
    server.get(mainPath + '/:id',  Controller.getPumpById);
}
