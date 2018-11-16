import * as restify from "restify";
import * as Controller from "../controllers/sensor";

export function routes(server: restify.Server, mainPath: string = ''): void{
    server.post(mainPath, Controller.addSensor);
    // server.patch(mainPath, Controller.updateSensor);
    server.patch(mainPath + '/:id', Controller.updateSensorById);
    // server.del(mainPath, Controller.deleteSensor);
    server.del(mainPath + '/:id', Controller.deleteSensorById);
    server.get(mainPath, Controller.fetchSensors);
    server.get(mainPath + '/:id', Controller.getSensorById);
}
