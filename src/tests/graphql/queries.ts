import gql from 'graphql-tag'


export const createUserQuery = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
` 