export const createUserQuery = `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
` 

export const authenticateUserQuery = `
  mutation AuthenticateUser($data: AuthenticateUserInput!) {
    authenticateUser(data: $data){
      token
    }
  }
`