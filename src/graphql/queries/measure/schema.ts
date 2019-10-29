const body = `
type Measure {
  id: ID!
  date: String!
  sensor: ID!
  value: Int!
}

input MeasureFilter {
  by: String!
  id: ID!
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
fetchMeasure(filter: MeasureFilter): [Measure!]!
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
