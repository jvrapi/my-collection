import gql from "graphql-tag";

export const getUsersQuery = gql`
  query GetUsers {
    user {
      id,
      name,
      username,
      email,
      createdAt
      updatedAt,
    }
  }
`