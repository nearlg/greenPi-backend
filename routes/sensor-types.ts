import * as restify from "restify";
import * as controller from "@/controllers/sensor-type";

export function routes(server: restify.Server, mainPath: string = "") {
  server.post(mainPath, controller.addSensorType);
  server.patch(mainPath + "/:id", controller.updateSensorType);
  server.del(mainPath + "/:id", controller.deleteSensorType);
  server.get(mainPath, controller.fetchSensorTypes);
  server.get(mainPath + "/:id", controller.getSensorType);
}
