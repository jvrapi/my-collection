export const createUserQuery = `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id,
      name,
      username,
      email,
      createdAt
      updatedAt,
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

export const updateUserQuery = `
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id,
      name,
      username,
      email,
      createdAt
      updatedAt,
    }
  }
`

export const addCardQuery = `
  mutation AddCard($data: AddCardInput!) {
    addCard(data: $data) {
      id,
      imageUrl,
      addedAt,
      quantity
    }
  }
`

export const updateCardsQuery = `
  mutation UpdateCards($data: [UpdateCardsInput!]!) {
    updateCards(data: $data) {
      id,
      imageUrl,
      addedAt,
      quantity
    }
  }
`

