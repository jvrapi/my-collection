export const createUserQuery = `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
` 