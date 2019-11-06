import * as restify from "restify";
import graphqlHTTP = require("express-graphql");
import { customFormatErrorFn, buildSchemas, extractResolvers } from "./helpers";
import userQueries from "./queries/user";
import sensorTypeQueries from "./queries/sensor-type";
import sensorQueries from "./queries/sensor";
import pumpHistoricalQueries from "./queries/pump-historical";
import pumpQueries from "./queries/pump";
import measureQueries from "./queries/measure";
import googleQueries from "./queries/google";
import environmentQueries from "./queries/environment";
import { GraphqlQuery } from "./helpers/graphql-query";
import { Server } from "../config";
import { getModels } from "../models";
import { getAuthenticationField } from "../services/auth.service";

const graphqlQueries: GraphqlQuery[] = [
  userQueries,
  sensorQueries,
  pumpQueries,
  sensorTypeQueries,
  pumpHistoricalQueries,
  measureQueries,
  googleQueries,
  environmentQueries
];

const schemas = buildSchemas(graphqlQueries);
const resolvers = extractResolvers(graphqlQueries);

export function setApiRoute(server: restify.Server, mainPath: string = "") {
  server.post(
    mainPath,
    graphqlHTTP(req => {
      const authData = getAuthenticationField(<restify.Request>req);
      return {
        schema: schemas,
        rootValue: resolvers,
        customFormatErrorFn,
        context: {
          req,
          models: getModels(authData)
        }
      };
    })
  );
  if (Server.ENVIRONMENT === "production") {
    return;
  }
  server.get(
    mainPath,
    graphqlHTTP({
      graphiql: true,
      schema: schemas,
      rootValue: resolvers,
      customFormatErrorFn
    })
  );
}
