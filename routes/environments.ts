import * as restify from "restify";
import * as Controller from "../controllers/environment";

export function routes(server: restify.Server, mainPath: string = ''): void{
    server.post(mainPath, Controller.addEnvironment);
    // server.patch(mainPath, Controller.updateEnvironment);
    server.patch(mainPath + '/:id', Controller.updateEnvironmentById);
    // server.del(mainPath, Controller.deleteEnvironment);
    server.del(mainPath + '/:id', Controller.deleteEnvironmentById);
    server.get(mainPath, Controller.fetchEnvironments);
    server.get(mainPath + '/:id', Controller.getEnvironmentById);
}
