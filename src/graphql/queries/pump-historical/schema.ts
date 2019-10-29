const body = `
type PumpHistorical {
  id: ID!
  date: String!
  pump: ID!
  state: Int!
}

input PumpHistoricalFilter {
  by: String!
  id: ID!
  gte: String
  lte: String
  sortBy: String
}

input AddPumpHistoricalData {
  date: String!
  pump: ID!
  state: Int!
}
`;
const query = `
fetchPumpHistorical(filter: PumpHistoricalFilter): [PumpHistorical!]!
getPumpHistorical(id: ID!): PumpHistorical!
`;
const mutation = `
addPumpHistorical(pumpHistoricalData: AddPumpHistoricalData!): PumpHistorical!
deletePumpHistorical(id: ID!): PumpHistorical!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
