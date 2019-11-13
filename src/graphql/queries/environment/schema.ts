const body = `
type Environment {
  id: ID!
  name: String!
  description: String!
  sensors: [ID!]!
  pumps: [ID!]!
}

type FetchEnvironmentsResult {
  data: [Environment!]!
  limit: Int!
  page: Int!
  total: Int!
  pages: Int!
}

input AddEnvironmentData {
  name: String!
  description: String!
  sensors: [ID!]!
  pumps: [ID!]!
}

input UpdateEnvironmentData {
  id: ID!
  name: String!
  description: String!
  sensors: [ID!]!
  pumps: [ID!]!
}
`;
const query = `
fetchEnvironments(pagination: PaginationData): FetchEnvironmentsResult!
getEnvironment(id: ID!): Environment!
`;
const mutation = `
addEnvironment(EnvironmentData: AddEnvironmentData!): Environment!
updateEnvironment(EnvironmentData: UpdateEnvironmentData!): Environment!
deleteEnvironment(id: ID!): Environment!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
