import { ApolloServer } from "@apollo/server"
import FakeTimers from "@sinonjs/fake-timers"
import request from 'supertest'
import { createApolloServer } from "../../../../server"
import { authenticateUserQuery, createUserQuery } from "../../../../tests/graphql/mutations"
import { getUsersQuery } from "../../../../tests/graphql/queries"
import { userData } from "../../../../tests/mocks/user"
import { Context } from "../../../../types/context"

describe('[e2e] Get user', () => {
  let testServer: ApolloServer<Context>
  let serverUrl: string
  
  beforeAll(async () => {
    const {server, url}= await createApolloServer()
    testServer = server
    serverUrl = url
  })

  afterAll(async () => {
    jest.clearAllTimers()
    await testServer.stop()
  })


  it('should not be able to get a user without an token', async () => {
 

    const updateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: getUsersQuery,
    })

    expect(updateUserResponse.status).toBe(200)

    expect(updateUserResponse.body.errors[0].extensions.status).toBe('401')
    
    expect(updateUserResponse.body.errors).toBeDefined()
    
    expect(updateUserResponse.body.data).toBeNull()
  })

  it('should not be able to get a user with expired token', async () => {
    const clock = FakeTimers.install();

    const createUserData = {
      email: 'ipi@jijacbij.la',
      name: 'Luke Higgins',
      username: 'uSuMsUMear',
      password: 'zoaoGYZn3F'
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

    const getUserResponse = await request(serverUrl)
      .post('')
      .send({
        query: getUsersQuery,
      })
      .set('authorization', `Bearer ${token}`)
      
    expect(getUserResponse.status).toBe(200)

    expect(getUserResponse.body.errors[0].extensions.status).toBe('401')
        
    expect(getUserResponse.body.errors).toBeDefined()
        
    expect(getUserResponse.body.data).toBeNull()

    clock.uninstall();

  })

  it('should be able to get user', async () => {

    const authenticateData = {
      username: userData.email,
      password: userData.password
    }

    await request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: {data: userData}
    })
    
    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data.authenticateUser.token

    const getUsersResponse = await request(serverUrl)
    .post('')
    .send({
      query: getUsersQuery,
    })
    .set('Authorization', token)

    expect(getUsersResponse.status).toBe(200)
    expect(getUsersResponse.body.errors).toBeUndefined()
    expect(getUsersResponse.body.data.getUsers).toBeDefined()

  })
})