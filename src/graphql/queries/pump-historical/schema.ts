const body = `
type PumpHistorical {
  id: ID!
  date: String!
  pump: ID!
  state: Int!
}

input PumpHistoricalFilter {
  gte: String
  lte: String
  sortBy: String
}

input PumpHistoricalArgs {
  by: String!
  id: ID!
  filter: PumpHistoricalFilter
}

input AddPumpHistoricalData {
  date: String!
  pump: ID!
  state: Int!
}
`;
const query = `
fetchPumpHistorical(args: PumpHistoricalArgs): [PumpHistorical!]!
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
