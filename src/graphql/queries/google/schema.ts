const query = `
authUrl: String!
signInGoogle(code: String!): SignInResponse!
`;

const schema: PreGraphqlSchema = {
  query
};

export default schema;
