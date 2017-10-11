import * as Config from "../config/config";
import * as restify from "restify";
import corsMiddleware from "restify-cors-middleware";

import mongoose = require("mongoose");

import * as MeasuresRoutes from "../routes/measures";
import * as SensorsRoutes from "../routes/sensors";
import * as SensorTypesRoutes from "../routes/sensor-types";
import * as EnvironmentsRoutes from "../routes/environments";
import * as PumpsRoutes from "../routes/pumps";
import * as PumpsHistorialsRoutes from "../routes/pumps-historials";
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

// Allow CORS
const cors = new corsMiddleware({
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)

// Set server plugings
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Set routes
let apiVersion = Config.Server.VERSION.split('.');
let apiRoute = '/api/v' + apiVersion[0];
MeasuresRoutes.routes(server, apiRoute + '/measures');
PumpsRoutes.routes(server, apiRoute + '/pumps');
PumpsHistorialsRoutes.routes(server, apiRoute + '/pumps-historials');
EnvironmentsRoutes.routes(server, apiRoute + '/environments');
SensorsRoutes.routes(server, apiRoute + '/sensors');
SensorTypesRoutes.routes(server, apiRoute + '/sensor-types');
 
server.listen(Config.Server.PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});