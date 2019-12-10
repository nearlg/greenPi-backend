import gql from 'graphql-tag';

const body = gql`
  type Environment {
    id: ID!
    name: String!
    description: String!
    sensors: [Sensor!]!
    pumps: [Pump!]!
  }

  type FetchEnvironmentsResult {
    items: [Environment!]!
    pagination: Pagination!
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
const query = gql`
fetchEnvironments(pagination: PaginationRequest): FetchEnvironmentsResult!
getEnvironment(id: ID!): Environment!
`;
const mutation = gql`
addEnvironment(environmentData: AddEnvironmentData!): Environment!
updateEnvironment(environmentData: UpdateEnvironmentData!): Environment!
deleteEnvironment(id: ID!): Environment!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
