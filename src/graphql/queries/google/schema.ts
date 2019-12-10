import gql from 'graphql-tag';

const query = gql`
googleAuthUrl: String!
signInGoogle(code: String!): SignInResponse!
`;

const schema: PreGraphqlSchema = {
  query
};

export default schema;
