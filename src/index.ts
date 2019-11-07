import * as Config from "./config";
import * as restify from "restify";

import mongoose = require("mongoose");

import { socketIOService } from "./services/sio/socket-io.service";
import { setApiRoute } from "./graphql";
import { requestAuth } from "./plugins/authentication";

// // Configure database
// mongoose.Promise = Promise;
// // const options    = {promiseLibrary: Promise};
// mongoose.connect(Config.Database.URI, { useMongoClient: true });

// mongoose.Promise = Promise;
// const options    = {promiseLibrary: Promise};
const mongooseOptions = <mongoose.ConnectionOptions>{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  promiseLibrary: Promise
};
mongoose.connect(Config.Database.URI, mongooseOptions);

// Create server
const server = restify.createServer({
  name: Config.Server.NAME,
  version: Config.Server.VERSION
});

// SocketIO Service setup and listening
socketIOService.listen(server.server);

// Set server plugings
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(requestAuth);

// GraphQL
setApiRoute(server, "/graphql");

server.listen(Config.Server.PORT, function() {
  console.log("%s listening at %s", server.name, server.url);
});
