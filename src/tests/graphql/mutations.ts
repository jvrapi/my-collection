import gql from 'graphql-tag';

export const createUserQuery = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const authenticateUserQuery = gql`
  mutation AuthenticateUser($data: AuthenticateUserInput!) {
    authenticateUser(data: $data) {
      token
    }
  }
`;

export const updateUserQuery = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id,
      name,
      username,
      email,
      createdAt
      updatedAt
    }
  }
`;

export const addCardQuery = gql`
  mutation AddCard($data: AddCardInput!) {
    addCard(data: $data) {
      id,
      imageUrl,
      quantity,
      addedAt,
      updatedAt
    }
  }
`;

export const updateCardsQuery = gql`
  mutation UpdateCards($data: [UpdateCardsInput!]!) {
    updateCards(data: $data) {
      id,
      imageUrl,
      addedAt,
      quantity
    }
  }
`;
