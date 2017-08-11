import * as Config from "../config/config";
import * as restify from "restify";

import mongoose = require("mongoose");

import * as MeasureRoutes from "../routes/measure";
import * as SensorRoutes from "../routes/sensor";
import * as SensorTypeRoutes from "../routes/sensor-type";
import * as EnvironmentRoutes from "../routes/environment";
import * as PumpRoutes from "../routes/pump";
import * as PumpHistorialRoutes from "../routes/pump-historial";
import { handleJsonData, addErrorHandler } from "../routes/helpers";
import { errorHandler as DataErrorHandler } from "../routes/helpers/data-error-handler";
import { errorHandler as MongooseErrorHandler } from "../routes/helpers/mongoose-error-handler";

// Configure database
mongoose.Promise = Promise;
const options    = {promiseLibrary: Promise};
mongoose.connect(Config.Database.URI, { useMongoClient: true });

// Create server
const server = restify.createServer({
  name: Config.Server.NAME,
  version: Config.Server.VERSION
});

// Setup error handlers
addErrorHandler(DataErrorHandler);
addErrorHandler(MongooseErrorHandler);

// Set server plugings
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Set routes
MeasureRoutes.routes(server, '/measure');
PumpRoutes.routes(server, '/pump');
PumpHistorialRoutes.routes(server, '/pump-historial');
EnvironmentRoutes.routes(server, '/environment');
SensorRoutes.routes(server, '/sensor');
SensorTypeRoutes.routes(server, '/sensor-type');
 
server.listen(Config.Server.PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});