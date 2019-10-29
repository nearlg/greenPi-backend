import resolver from "./resolver";
import schema from "./schema";
import { GraphqlQuery } from "../../helpers/graphql-query";

const query: GraphqlQuery = {
  resolver,
  schema
};

export default query;
