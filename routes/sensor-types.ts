import * as restify from "restify";
import * as Controller from "../controllers/sensor-type";

export function routes(server: restify.Server, mainPath: string = ''): void{
    server.post(mainPath, Controller.addSensorType);
    // server.patch(mainPath, Controller.updateSensorType);
    server.patch(mainPath + '/:id', Controller.updateSensorTypeById);
    // server.del(mainPath, Controller.deleteSensorType);
    server.del(mainPath + '/:id', Controller.deleteSensorTypeById);
    server.get(mainPath, Controller.fetchSensorTypes);
    server.get(mainPath + '/:id', Controller.getSensorTypeById);
}
