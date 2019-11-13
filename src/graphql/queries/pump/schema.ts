const body = `
type Pump {
  id: ID!
  name: String!
  description: String!
  connectionPorts: [Int!]!
}

type FetchPumpsResult {
  data: [Pump!]!
  limit: Int!
  page: Int!
  total: Int!
  pages: Int!
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

const query = `
fetchPumps(pagination: PaginationData): FetchPumpsResult!
getPump(id: ID!): Pump!
`;
const mutation = `
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
