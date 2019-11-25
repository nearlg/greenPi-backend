const body = `
type Measure {
  id: ID!
  date: String!
  sensor: ID!
  value: Int!
}

type MeasurePopulated {
  id: ID!
  date: String!
  sensor: Sensor!
  value: Int!
}

type FetchMeasuresResult {
  items: [Measure!]!
  limit: Int!
  page: Int!
  total: Int!
  pages: Int!
}

input MeasureFilter {
  gte: String
  lte: String
  sortBy: String
}

input AddMeasureData {
  date: String!
  sensor: ID!
  value: Int!
}
`;
const query = `
fetchMeasures(by: String!, id: ID!, pagination: PaginationRequest, filter: MeasureFilter): FetchMeasuresResult!
getMeasure(id: ID!): MeasurePopulated!
`;
const mutation = `
addMeasure(measureData: AddMeasureData!): Measure!
deleteMeasure(id: ID!): Measure!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
