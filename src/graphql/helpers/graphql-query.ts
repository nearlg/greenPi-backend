import { Resolver } from "./resolvers";

export interface GraphqlQuery {
  schema: PreGraphqlSchema;
  resolver: Resolver;
}
