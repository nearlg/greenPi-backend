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

  type MeasureCriteriaFilterOut {
    gte: Date
    lte: Date
    sortBy: String
  }

  input MeasureCriteriaFilterIn {
    gte: Date
    lte: Date
    sortBy: String
  }

  input FetchMeasureCriteriaIn {
    by: String!
    id: ID!
    filter: MeasureCriteriaFilterIn
  }

  type FetchMeasureCriteriaOut {
    by: String!
    id: ID!
    filter: MeasureCriteriaFilterOut
  }

  type FetchMeasuresResult {
    items: [MeasurePopulated!]!
    pagination: Pagination!
    criteria: FetchMeasureCriteriaOut
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
fetchMeasures(criteria: FetchMeasureCriteriaIn!, paginationRequest: PaginationRequest): FetchMeasuresResult!
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
