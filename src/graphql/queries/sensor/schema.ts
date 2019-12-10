import gql from 'graphql-tag';

const body = gql`
  type Sensor {
    id: ID!
    name: String!
    description: String!
    type: SensorType!
    connectionPorts: [Int!]!
  }

  type FetchSensorsResult {
    items: [Sensor!]!
    pagination: Pagination!
  }

  input AddSensorData {
    name: String!
    description: String!
    type: String!
    connectionPorts: [Int!]!
  }

  input UpdateSensorData {
    id: ID!
    name: String!
    description: String!
    type: String!
    connectionPorts: [Int!]!
  }
`;

const query = gql`
fetchSensors(pagination: PaginationRequest): FetchSensorsResult!
getSensor(id: ID!): Sensor!
`;
const mutation = gql`
addSensor(sensorData: AddSensorData!): Sensor!
updateSensor(sensorData: UpdateSensorData!): Sensor!
deleteSensor(id: ID!): Sensor!
`;

const schema = {
  body,
  query,
  mutation
};

export default schema;
