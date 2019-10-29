const body = `
type Unit {
  name: String!
  description: String!
}

type SensorType {
  id: ID!
  name: String!
  description: String!
  unit: Unit!
}

input InputUnit {
  name: String!
  description: String!
}

input AddSensorTypeData {
  name: String!
  description: String!
  unit: InputUnit!
}

input UpdateSensorTypeData {
  id: ID!
  name: String!
  description: String!
  unit: InputUnit!
}
`;
const query = `
fetchSensorTypes: [SensorType!]!
getSensorType(id: ID!): SensorType!
`;
const mutation = `
addSensorType(sensorTypeData: AddSensorTypeData!): SensorType!
updateSensorType(sensorTypeData: UpdateSensorTypeData!): SensorType!
deleteSensorType(id: ID!): SensorType!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
