import gql from 'graphql-tag';

const body = gql`
  input SignUpData {
    name: String!
    email: String!
    roleName: String!
  }

  input EditProfileData {
    name: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    roleName: String!
  }

  type FetchUsersResult {
    items: [User!]!
    pagination: Pagination!
  }

  input AddUserData {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserData {
    id: ID!
    name: String!
    email: String!
    password: String
    roleName: String!
  }
`;
const query = gql`
signInLocal(email: String!, password: String!): SignInResponse!
getProfile: User!
fetchUsers(pagination: PaginationRequest): FetchUsersResult!
getUser: User!
`;
const mutation = gql`
signUp(userData: SignUpData!): User!
editProfile(userData: EditProfileData!): User!
addUser(userData: AddUserData!): User!
updateUser(userData: UpdateUserData!): User!
deleteUser(id: ID!): User!
`;

const schema: PreGraphqlSchema = {
  body,
  query,
  mutation
};

export default schema;
