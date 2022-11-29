import { ApolloServer } from "@apollo/server"
import FakeTimers from "@sinonjs/fake-timers"
import { randomUUID } from "node:crypto"
import request from "supertest"
import { JwtTokenProvider } from "../../../../providers/token/jwt-token-provider"
import { createApolloServer } from "../../../../server"
import { addCardQuery, authenticateUserQuery, createUserQuery } from "../../../../tests/graphql/mutations"
import { userData } from "../../../../tests/mocks/user"
import { Context } from "../../../../types/context"

describe('[unit] Add card to collection', () => {
  let testServer: ApolloServer<Context>
  let serverUrl: string


  const authenticateData = {
    username: userData.email,
    password: userData.password
  }
  
  beforeAll(async () => {
    const {server, url}= await createApolloServer()
    testServer = server
    serverUrl = url
    
    await request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: {data: userData}
    })
    
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should not be able to add an card to collection without an token', async () => {

    const addCardData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c'
    }

    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })


    expect(addCardToCollectionResponse.status).toBe(200)

    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('401')
    
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
    
    expect(addCardToCollectionResponse.body.data).toBeNull()
  })

  it('should not be able to update a user with expired token', async () => {
    const clock = FakeTimers.install();

    const createUserData = {
      email: 'ipi@jijacbij.la',
      name: 'Luke Higgins',
      username: 'uSuMsUMear',
      password: 'zoaoGYZn3F'
    }

    const addCardData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c'
    }
    


    const authenticateData = {
      username: createUserData.email,
      password: createUserData.password
    }



    await request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: {data: createUserData, }
    })

    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data?.authenticateUser?.token


    await clock.tickAsync(16000);

    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })
    .set('authorization', `Bearer ${token}`)


    expect(addCardToCollectionResponse.status).toBe(200)

    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('401')
        
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
        
    expect(addCardToCollectionResponse.body.data).toBeNull()
    
    clock.uninstall();
    
  })

  it('should be able to add card to collection', async()=>{
    const addCardData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c'
    }

    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data.authenticateUser.token

    const addCardResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })
    .set('Authorization', `Bearer ${token}`)

    expect(addCardResponse.body.data.addCard.id).toBeDefined()
    expect(addCardResponse.body.data.addCard.imageUrl).toBeDefined()
    expect(addCardResponse.body.data.addCard.addedAt).toBeDefined()
    expect(addCardResponse.body.data.addCard.quantity).toBeDefined()
  } )

  it('should not be able to add card to collection without an quantity', async() => {
   
    const addCardData = {
      quantity: 0,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c'
    }

    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data.authenticateUser.token

    const addCardResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })
    .set('Authorization', `Bearer ${token}`)


    expect(addCardResponse.status).toBe(200)
    expect(addCardResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardResponse.body.data).toBeNull()
    expect(addCardResponse.body.errors).toBeDefined()
    expect(addCardResponse.body.errors[0].message).toBe('You need to provide an quantity')

  })

  it('should not be able to add card to collection without an card id', async () => {

    const addCardData = {
      quantity: 1,
      cardId: ''
    }

    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data.authenticateUser.token

    const addCardResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })
    .set('Authorization', `Bearer ${token}`)


    expect(addCardResponse.status).toBe(200)
    expect(addCardResponse.body.data).toBeNull()
    expect(addCardResponse.body.errors).toBeDefined()
    expect(addCardResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardResponse.body.errors[0].message).toBe('You need to provide an card')
    
  })

  it('should not be able to add card to collection with invalid user', async () => {
    const addCardData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c'
    }

    const tokenProvider = new JwtTokenProvider()
    const token = tokenProvider.generateToken({userId: randomUUID()})
    
    const addCardResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })
    .set('Authorization', `Bearer ${token}`)

    expect(addCardResponse.status).toBe(200)
    expect(addCardResponse.body.data).toBeNull()
    expect(addCardResponse.body.errors).toBeDefined()
    expect(addCardResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardResponse.body.errors[0].message).toBe('Invalid user')

  })

  it('should not be able to add card to collection with invalid card', async () => {
    const addCardData = {
      quantity: 1,
      cardId: 'wrong_id'
    }

    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data.authenticateUser.token

    const addCardResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })
    .set('Authorization', `Bearer ${token}`)

    expect(addCardResponse.status).toBe(200)
    expect(addCardResponse.body.data).toBeNull()
    expect(addCardResponse.body.errors).toBeDefined()
    expect(addCardResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardResponse.body.errors[0].message).toBe('Invalid card')

  })

  it('should not be able to add an card to collection if his already in collection', async () => {
    const addCardData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c'
    }

    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data.authenticateUser.token

    await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })
    .set('Authorization', `Bearer ${token}`)


    const addCardResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardData}
    })
    .set('Authorization', `Bearer ${token}`)

    expect(addCardResponse.status).toBe(200)
    expect(addCardResponse.body.data).toBeNull()
    expect(addCardResponse.body.errors).toBeDefined()
    expect(addCardResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardResponse.body.errors[0].message).toBe('This card already in your collection')
  })
})