export const genericTypes = `
  scalar Date

  input PaginationRequest {
    limit: Int!
    page: Int
  }

  type Pagination {
    limit: Int!
    page: Int!
    total: Int!
    pages: Int!
  }

  type SignInResponse {
    token: String!
  }
`;
