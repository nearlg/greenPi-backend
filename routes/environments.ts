import * as restify from "restify";
import * as controller from "@/controllers/environment";

export function routes(server: restify.Server, mainPath: string = "") {
  server.post(mainPath, controller.addEnvironment);
  server.patch(mainPath + "/:id", controller.updateEnvironment);
  server.del(mainPath + "/:id", controller.deleteEnvironment);
  server.get(mainPath, controller.fetchEnvironments);
  server.get(mainPath + "/:id", controller.getEnvironment);
}
