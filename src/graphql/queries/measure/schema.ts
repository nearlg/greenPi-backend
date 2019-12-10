const body = `
type Measure {
  id: ID!
  date: Date!
  sensor: ID!
  value: Int!
}

type MeasurePopulated {
  id: ID!
  date: Date!
  sensor: Sensor!
  value: Int!
}

type MeasureCriteriaFilter {
  gte: Date
  lte: Date
  sortBy: String
}

type FetchMeasureCriteria {
  by: String!;
  id: ID!;
  filter: MeasureCriteriaFilter;
}

type FetchMeasuresResult {
  items: [Measure!]!
  pagination: Pagination!
  criteria: MeasureCriteriaFilter
}

input MeasureFilter {
  gte: Date
  lte: Date
  sortBy: String
}

input AddMeasureData {
  date: Date!
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
