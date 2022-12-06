import gql from 'graphql-tag';

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
`;

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
        imageUrl,
        quantity,
        addedAt,
        updatedAt
      }
    }
  }
`;

export const getCardsQuery = gql`
  query Cards($data: GetCardsFilters!){
    cards(data: $data) {
      id,
      imageUrl,
      name
    }
  }

`;
