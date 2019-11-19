const query = `
googleAuthUrl: String!
signInGoogle(code: String!): SignInResponse!
`;

const schema: PreGraphqlSchema = {
  query
};

export default schema;
