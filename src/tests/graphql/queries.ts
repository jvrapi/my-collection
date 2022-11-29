export const getUsersQuery = `
  query GetUsers {
    user {
      id,
      name,
      username,
      email,
      createdAt
      updatedAt
    }
  }
`