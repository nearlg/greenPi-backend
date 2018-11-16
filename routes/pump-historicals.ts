import * as restify from "restify";
import * as Controller from "../controllers/pump-historical";

export function routes(server: restify.Server, mainPath: string = '') {
    server.get(mainPath + '/', Controller.getPumpHistoricals);
    server.post(mainPath, Controller.addPumpHistorical);
    // server.patch(mainPath, Controller.updatePumpHistorical);
    server.patch(mainPath + '/:id', Controller.updatePumpHistoricalById);
    // server.del(mainPath, Controller.deletePumpHistorical);
    server.del(mainPath + '/:id', Controller.deletePumpHistoricalById);
    server.get(mainPath, Controller.fetchPumpHistoricals);
    server.get(mainPath + '/:id', Controller.getPumpHistoricalById);
}
