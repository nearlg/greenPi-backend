const body = `
type Measure {
  id: ID!
  date: String!
  sensor: ID!
  value: Int!
}

type FetchMeasuresResult {
  data: [Measure!]!
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
fetchMeasures(by: String!, id: ID!, pagination: PaginationData, filter: MeasureFilter): FetchMeasuresResult!
getMeasure(id: ID!): Measure!
`;
const mutation = `
addMeasure(MeasureData: AddMeasureData!): Measure!
deleteMeasure(id: ID!): Measure!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
