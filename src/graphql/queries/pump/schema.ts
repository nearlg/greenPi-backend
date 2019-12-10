import gql from 'graphql-tag';

const body = gql`
  type Pump {
    id: ID!
    name: String!
    description: String!
    connectionPorts: [Int!]!
  }

  type FetchPumpsResult {
    items: [Pump!]!
    pagination: Pagination!
  }

  input AddPumpData {
    name: String!
    description: String!
    connectionPorts: [Int!]!
  }

  input UpdatePumpData {
    id: ID!
    name: String!
    description: String!
    connectionPorts: [Int!]!
  }
`;

const query = gql`
fetchPumps(pagination: PaginationRequest): FetchPumpsResult!
getPump(id: ID!): Pump!
`;
const mutation = gql`
addPump(pumpData: AddPumpData!): Pump!
updatePump(pumpData: UpdatePumpData!): Pump!
deletePump(id: ID!): Pump!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
