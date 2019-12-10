import gql from 'graphql-tag';

const body = gql`
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

type PumpHistoricalsCriteriaFilter {
  gte: Date
  lte: Date
  sortBy: String
}

type FetchPumpHistoricalsCriteria {
  by: String!;
  id: ID!;
  filter: PumpHistoricalsCriteriaFilter;
}

type FetchPumpHistoricalsResult {
  items: [PumpHistorical!]!
  pagination: Pagination!
  criteria: FetchPumpHistoricalsCriteria
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
const query = gql`
fetchPumpHistoricals(by: String!, id: ID!, pagination: PaginationRequest, filter: PumpHistoricalFilter): FetchPumpHistoricalsResult!
getPumpHistorical(id: ID!): PumpHistoricalPopulated!
`;
const mutation = gql`
addPumpHistorical(pumpHistoricalData: AddPumpHistoricalData!): PumpHistorical!
deletePumpHistorical(id: ID!): PumpHistorical!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
