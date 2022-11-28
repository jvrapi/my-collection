export const getUsersQuery = `
  query GetUsers {
    getUsers {
      id,
      name,
      username,
      email,
      createdAt
      updatedAt
    }
  }
`