const body = `
type Environment {
  id: ID!
  name: String!
  description: String!
  sensors: [ID!]!
  pumps: [ID!]!
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
fetchEnvironments: [Environment!]!
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
