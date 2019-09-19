import * as restify from "restify";
import * as controller from "@/controllers/measure";

export function routes(server: restify.Server, mainPath: string = "") {
  server.get(mainPath + "/", controller.getMeasures);
  server.post(mainPath, controller.addMeasure);
  server.patch(mainPath + "/:id", controller.updateMeasure);
  server.del(mainPath + "/:id", controller.deleteMeasure);
  server.get(mainPath, controller.fetchMeasures);
  server.get(mainPath + "/:id", controller.getMeasure);
}
