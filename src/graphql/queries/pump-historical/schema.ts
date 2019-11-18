const body = `
type PumpHistorical {
  id: ID!
  date: String!
  pump: ID!
  state: Int!
}

type FetchPumpHistoricalsResult {
  items: [PumpHistorical!]!
  limit: Int!
  page: Int!
  total: Int!
  pages: Int!
}

input PumpHistoricalFilter {
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
fetchPumpHistoricals(by: String!, id: ID!, pagination: PaginationRequest, filter: PumpHistoricalFilter): FetchPumpHistoricalsResult!
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
