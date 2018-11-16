import * as restify from "restify";
import * as Controller from "../controllers/measure";

export function routes(server: restify.Server, mainPath: string = '') {
    server.get(mainPath + '/', Controller.getMeasure);
    server.post(mainPath, Controller.addMeasure);
    // server.patch(mainPath, Controller.updateMeasure);
    server.patch(mainPath + '/:id', Controller.updateMeasureById);
    // server.del(mainPath, Controller.deleteMeasure);
    server.del(mainPath + '/:id', Controller.deleteMeasureById);
    server.get(mainPath, Controller.fetchMeasures);
    server.get(mainPath + '/:id', Controller.getMeasureById);
}
