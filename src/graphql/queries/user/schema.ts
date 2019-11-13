const body = `
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
  data: [User!]!
  limit: Int!
  page: Int!
  total: Int!
  pages: Int!
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
const query = `
signInLocal(email: String!, password: String!): String!
getProfile: User!
fetchUsers(pagination: PaginationData): FetchUsersResult!
getUser: User!
`;
const mutation = `
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
