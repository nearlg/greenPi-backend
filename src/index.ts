import * as Config from "../config/config";
import * as restify from "restify";

import mongoose = require("mongoose");

import * as MeasuresRoutes from "../routes/measures";
import * as SensorsRoutes from "../routes/sensors";
import * as SensorTypesRoutes from "../routes/sensor-types";
import * as EnvironmentsRoutes from "../routes/environments";
import * as PumpsRoutes from "../routes/pumps";
import * as PumpsHistoricalsRoutes from "../routes/pumps-historicals";
import { addErrorHandler } from "../routes/helpers";
import { errorHandler as DataErrorHandler } from "../routes/helpers/data-error-handler";
import { errorHandler as MongooseErrorHandler } from "../routes/helpers/mongoose-error-handler";
import { SocketIOService } from "../services/socket-io-service";


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

// SocketIO Service setup and listening
const socketIOService = new SocketIOService(server.server);
socketIOService.listen();

// Set server plugings
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Set routes
let apiVersion = Config.Server.VERSION.split('.');
let apiRoute = '/api/v' + apiVersion[0];
MeasuresRoutes.routes(server, apiRoute + '/measures', socketIOService);
PumpsRoutes.routes(server, apiRoute + '/pumps');
PumpsHistoricalsRoutes.routes(server, apiRoute + '/pump-historicals');
EnvironmentsRoutes.routes(server, apiRoute + '/environments');
SensorsRoutes.routes(server, apiRoute + '/sensors');
SensorTypesRoutes.routes(server, apiRoute + '/sensor-types');

server.listen(Config.Server.PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});
