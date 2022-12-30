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
  query getUserCards($data: UserCollectionInput!){
    user{
      id,
      name,
      username,
      email,
      createdAt
      updatedAt,
      cards(data: $data) {
        items {
          id,
         imageUrl,
          quantity,
          addedAt,
          updatedAt
        },
        pagination {
          currentPage,
          lastPage,
          nextPage,
          prevPage,
          totalItems
        }
      }
    }
  }
`;

export const getCardsQuery = gql`
  query Cards($data: GetCardsInput!){
    cards(data: $data) {
      items {
        id,
        imageUrl,
        name
      },
      pagination {
        currentPage,
        lastPage,
        nextPage,
        prevPage,
        totalItems
      }
    }
  }

`;

export const getSetsQuery = gql`
  query Sets($data: GetSetsInput!) {
    sets(data: $data) {
      items {
        id,
        name,
        code,
        iconUrl,
        releasedAt
      },
      pagination {
        currentPage,
        lastPage,
        nextPage,
        prevPage,
        totalItems
      }
    }
  }
`;
