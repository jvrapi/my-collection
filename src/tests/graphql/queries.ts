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

export const getUserCardsQuery = gql`
  query getUserCards{
    user{
      id,
      name,
      username,
      email,
      createdAt
      updatedAt,
      cards {
        id,
        addedAt,
        imageUrl,
        quantity
      }
    }
  }
`