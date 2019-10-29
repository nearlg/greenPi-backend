const query = `
authUrl: String!
signInGoogle(code: String!): String!
`;

const schema: PreGraphqlSchema = {
  query
};

export default schema;
