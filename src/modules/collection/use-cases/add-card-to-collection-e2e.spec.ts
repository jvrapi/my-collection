import { ApolloServer } from "@apollo/server"
import FakeTimers from "@sinonjs/fake-timers"
import { randomUUID } from "node:crypto"
import request from "supertest"
import { JwtTokenProvider } from "../../../providers/token/jwt-token-provider"
import { createApolloServer } from "../../../server"
import { addCardToCollectionQuery, authenticateUserQuery, createUserQuery } from "../../../tests/graphql/mutations"
import { userData } from "../../../tests/mocks/user"
import { Context } from "../../../types/context"

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

    const addCardToCollectionData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c'
    }

    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
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

    const addCardToCollectionData = {
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
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('authorization', `Bearer ${token}`)


    expect(addCardToCollectionResponse.status).toBe(200)

    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('401')
        
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
        
    expect(addCardToCollectionResponse.body.data).toBeNull()
    
    clock.uninstall();
    
  })


  it('should be able to add card to collection', async()=>{
    const addCardToCollectionData = {
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

    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('Authorization', `Bearer ${token}`)

    expect(addCardToCollectionResponse.status).toBe(200)
    expect(addCardToCollectionResponse.body.data.addCardToCollection.id).toBeDefined()
    expect(addCardToCollectionResponse.body.data.addCardToCollection.imageUrl).toBeDefined()
  } )

  it('should not be able to add card to collection without an quantity', async() => {
   
    const addCardToCollectionData = {
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

    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('Authorization', `Bearer ${token}`)


    expect(addCardToCollectionResponse.status).toBe(200)
    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardToCollectionResponse.body.data).toBeNull()
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
    expect(addCardToCollectionResponse.body.errors[0].message).toBe('You need to provide an quantity')

  })

  it('should not be able to add card to collection without an card id', async () => {

    const addCardToCollectionData = {
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

    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('Authorization', `Bearer ${token}`)


    expect(addCardToCollectionResponse.status).toBe(200)
    expect(addCardToCollectionResponse.body.data).toBeNull()
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardToCollectionResponse.body.errors[0].message).toBe('You need to provide an card')
    
  })

  it('should not be able to add card to collection with invalid user', async () => {
    const addCardToCollectionData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c'
    }

    const tokenProvider = new JwtTokenProvider()
    const token = tokenProvider.generateToken({userId: randomUUID()})
    
    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('Authorization', `Bearer ${token}`)

    expect(addCardToCollectionResponse.status).toBe(200)
    expect(addCardToCollectionResponse.body.data).toBeNull()
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardToCollectionResponse.body.errors[0].message).toBe('Invalid user')

  })

  it('should not be able to add card to collection with invalid card', async () => {
    const addCardToCollectionData = {
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

    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('Authorization', `Bearer ${token}`)

    expect(addCardToCollectionResponse.status).toBe(200)
    expect(addCardToCollectionResponse.body.data).toBeNull()
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardToCollectionResponse.body.errors[0].message).toBe('Invalid card')

  })

  it('should not be able to add an card to collection if his already in collection', async () => {
    const addCardToCollectionData = {
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
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('Authorization', `Bearer ${token}`)


    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: addCardToCollectionQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('Authorization', `Bearer ${token}`)

    expect(addCardToCollectionResponse.status).toBe(200)
    expect(addCardToCollectionResponse.body.data).toBeNull()
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('400')
    expect(addCardToCollectionResponse.body.errors[0].message).toBe('This card already in your collection')
  })
})