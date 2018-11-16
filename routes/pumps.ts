import * as restify from 'restify';
import * as controller from '../controllers/pump';

export function routes(server: restify.Server, mainPath: string = ''): void{
    server.post(mainPath, controller.addPump);
    server.patch(mainPath + '/:id', controller.updatePump);
    server.del(mainPath + '/:id', controller.deletePump);
    server.get(mainPath, controller.fetchPumps);
    server.get(mainPath + '/:id',  controller.getPump);
}
