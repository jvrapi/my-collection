import { ApolloServer } from "@apollo/server"
import FakeTimers from "@sinonjs/fake-timers"
import { randomUUID } from "node:crypto"
import request from 'supertest'
import { createApolloServer } from "../../../../server"
import { addCardQuery, authenticateUserQuery, createUserQuery, updateCardsQuery } from "../../../../tests/graphql/mutations"
import { userData } from "../../../../tests/mocks/user"
import { Context } from "../../../../types/context"

describe('[e2e] Update cards',  () => {
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
      query: updateCardsQuery,
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

    await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('authorization', `Bearer ${token}`)


    await clock.tickAsync(16000);

    const addCardToCollectionResponse = await request(serverUrl)
    .post('')
    .send({
      query: updateCardsQuery,
      variables: {data: [addCardToCollectionData]}
    })
    .set('authorization', `Bearer ${token}`)


    expect(addCardToCollectionResponse.status).toBe(200)

    expect(addCardToCollectionResponse.body.errors[0].extensions.status).toBe('401')
        
    expect(addCardToCollectionResponse.body.errors).toBeDefined()
        
    expect(addCardToCollectionResponse.body.data).toBeNull()
    
    clock.uninstall();
    
  })

  it('should be able to update quantity of an card in collection', async () => {
   

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

    const token = authenticateUserResponse.body.data?.authenticateUser?.token



    await request(serverUrl)
    .post('')
    .send({
      query: addCardQuery,
      variables: {data: addCardToCollectionData}
    })
    .set('authorization', `Bearer ${token}`)


    const updateCardsResponse = await request(serverUrl)
    .post('')
    .send({
      query: updateCardsQuery,
      variables: {data: [{
        quantity: 2,
        cardId: addCardToCollectionData.cardId
      }]}
    })
    .set('authorization', `Bearer ${token}`)

    expect(updateCardsResponse.status).toBe(200)
    expect(updateCardsResponse.body.errors).toBeUndefined()
    expect(updateCardsResponse.body.data.updateCards).toBeDefined()
    expect(updateCardsResponse.body.data.updateCards[0].quantity).toEqual(2)
  })

  it('should not be able to update with empty array', async () => {
    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data?.authenticateUser?.token

    const updateCardsResponse = await request(serverUrl)
    .post('')
    .send({
      query: updateCardsQuery,
      variables: {data: []}
    })
    .set('authorization', `Bearer ${token}`)
    expect(updateCardsResponse.status).toBe(200)
    expect(updateCardsResponse.body.data).toBeNull()
    expect(updateCardsResponse.body.errors).toBeDefined()
    expect(updateCardsResponse.body.errors[0].extensions.status).toBe('400')
    expect(updateCardsResponse.body.errors[0].message).toBe('You need to provide at least an card to be updated')

  })


  it('should not be able to update with empty array', async () => {
    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data?.authenticateUser?.token

    const updateCardsResponse = await request(serverUrl)
    .post('')
    .send({
      query: updateCardsQuery,
      variables: {data: [{
        cardId: randomUUID(),
        quantity: 1
      }]}
    })
    .set('authorization', `Bearer ${token}`)
    expect(updateCardsResponse.status).toBe(200)
    expect(updateCardsResponse.body.data).toBeNull()
    expect(updateCardsResponse.body.errors).toBeDefined()
    expect(updateCardsResponse.body.errors[0].extensions.status).toBe('400')
    expect(updateCardsResponse.body.errors[0].message).toBe('Some card is not in collection')
  })


})