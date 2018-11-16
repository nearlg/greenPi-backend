import * as restify from 'restify';
import * as controller from '../controllers/sensor';

export function routes(server: restify.Server, mainPath: string = ''): void{
    server.post(mainPath, controller.addSensor);
    server.patch(mainPath + '/:id', controller.updateSensor);
    server.del(mainPath + '/:id', controller.deleteSensor);
    server.get(mainPath, controller.fetchSensors);
    server.get(mainPath + '/:id', controller.getSensor);
}
