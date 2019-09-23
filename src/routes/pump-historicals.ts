import * as restify from "restify";
import * as controller from "../controllers/pump-historical";

export function routes(server: restify.Server, mainPath: string = "") {
  server.get(mainPath + "/", controller.getPumpHistoricals);
  server.post(mainPath, controller.addPumpHistorical);
  server.patch(mainPath + "/:id", controller.updatePumpHistorical);
  server.del(mainPath + "/:id", controller.deletePumpHistorical);
  server.get(mainPath, controller.fetchPumpHistoricals);
  server.get(mainPath + "/:id", controller.getPumpHistorical);
}
