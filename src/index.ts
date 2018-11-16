import * as Config from "../config";
import * as restify from "restify";

import mongoose = require("mongoose");

import * as MeasureRoutes from "../routes/measures";
import * as SensorRoutes from "../routes/sensors";
import * as SensorTypeRoutes from "../routes/sensor-types";
import * as EnvironmentRoutes from "../routes/environments";
import * as PumpRoutes from "../routes/pumps";
import * as PumpHistoricalsRoutes from "../routes/pump-historicals";
import * as UserRoutes from "../routes/users";
import { addErrorHandler } from "../controllers/helpers";
import { errorHandler as DataErrorHandler } from "../controllers/helpers/data-error-handler";
import { errorHandler as MongooseErrorHandler } from "../controllers/helpers/mongoose-error-handler";
import { errorHandler as AuthErrorHandler } from "../controllers/helpers/auth-error-handler";
import { socketIOService } from "../services/socket-io-service";
import { requestAuthz } from "../plugins/authorization";


// Configure database
mongoose.Promise = Promise;
// const options    = {promiseLibrary: Promise};
mongoose.connect(Config.Database.URI, { useMongoClient: true });

// Create server
const server = restify.createServer({
  name: Config.Server.NAME,
  version: Config.Server.VERSION
});

// Setup error handlers
addErrorHandler(DataErrorHandler);
addErrorHandler(MongooseErrorHandler);
addErrorHandler(AuthErrorHandler);

// SocketIO Service setup and listening
socketIOService.listen(server.server);

// Set server plugings
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(requestAuthz);

// Set routes
let apiVersion = Config.Server.VERSION.split('.');
let apiRoute = '/api/v' + apiVersion[0];
MeasureRoutes.routes(server, apiRoute + '/measures');
PumpRoutes.routes(server, apiRoute + '/pumps');
PumpHistoricalsRoutes.routes(server, apiRoute + '/pump-historicals');
EnvironmentRoutes.routes(server, apiRoute + '/environments');
SensorRoutes.routes(server, apiRoute + '/sensors');
SensorTypeRoutes.routes(server, apiRoute + '/sensor-types');
UserRoutes.routes(server, apiRoute + '/users');

server.listen(Config.Server.PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});
