const body = `
  type PumpHistorical {
    id: ID!
    date: Date!
    pump: ID!
    state: Int!
  }

  type PumpHistoricalPopulated {
    id: ID!
    date: Date!
    pump: Pump!
    state: Int!
  }

  input PumpHistoricalsCriteriaFilterIn {
    gte: Date
    lte: Date
    sortBy: String
  }

  type PumpHistoricalsCriteriaFilterOut {
    gte: Date
    lte: Date
    sortBy: String
  }

  input FetchPumpHistoricalsCriteriaIn {
    by: String!
    id: ID!
    filter: PumpHistoricalsCriteriaFilterIn
  }

  type FetchPumpHistoricalsCriteriaOut {
    by: String!
    id: ID!
    filter: PumpHistoricalsCriteriaFilterOut
  }

  type FetchPumpHistoricalsResult {
    items: [PumpHistoricalPopulated!]!
    pagination: Pagination!
    criteria: FetchPumpHistoricalsCriteriaOut
  }

  input PumpHistoricalFilter {
    gte: Date
    lte: Date
    sortBy: String
  }

  input AddPumpHistoricalData {
    date: Date!
    pump: ID!
    state: Int!
  }
`;
const query = `
fetchPumpHistoricals(criteria: FetchPumpHistoricalsCriteriaIn!, paginationRequest: PaginationRequest): FetchPumpHistoricalsResult!
getPumpHistorical(id: ID!): PumpHistoricalPopulated!
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
