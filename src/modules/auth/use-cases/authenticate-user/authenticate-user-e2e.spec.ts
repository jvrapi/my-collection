import { ApolloServer } from '@apollo/server'
import request from 'supertest'
import { createApolloServer } from '../../../../server'
import { authenticateUserQuery, createUserQuery } from '../../../../tests/graphql/mutations'
import { userData } from '../../../../tests/mocks/user'
import { Context } from '../../../../types/context'


describe('[e2e] Authenticate user', () => {
  let testServer: ApolloServer<Context>
  let serverUrl: string
  
  beforeAll(async () => {
    const {server, url}= await createApolloServer()
    testServer = server
    serverUrl = url
    await request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: userData}
    })
    
  })

  afterAll(() => {
    testServer.stop()
  })
  

  it('should be able to authenticate a user', async () => {
    const authenticateData = {
      username: userData.email,
      password: userData.password
    }
    const response = await request(serverUrl).post('').send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    expect(response.status).toBe(200)
    expect(response.body.errors).toBeUndefined()
    expect(response.body.data?.authenticateUser?.token).toBeDefined()
  })
  
  it('should not be able to authenticate user without username or password', async () => {
     const authenticateData = {
      username: '',
      password: ''
    }
    const response = await request(serverUrl).post('').send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })


    expect(response.status).toBe(200)
    expect(response.body.errors).toBeDefined()
    expect(response.body.data).toBeNull()
  })
  
  it('should not be able to authenticate user with wrong password', async () => {
    const authenticateData = {
      username: userData.email,
      password: 'wrong-password',
    }

    const response = await request(serverUrl).post('').send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })


    expect(response.status).toBe(200)
    expect(response.body.errors).toBeDefined()
    expect(response.body.data).toBeNull()
  })
  
  it('should not be able to authenticate user with invalid email', async () => {
    const authenticateData = {
      username: 'ero@aniihpo.uk',
      password: userData.password,
    }

    const response = await request(serverUrl).post('').send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })


    expect(response.status).toBe(200)
    expect(response.body.errors).toBeDefined()
    expect(response.body.data).toBeNull()
  })
  
  it('should not be able to authenticate user with invalid username', async () => {
    const authenticateData = {
      username: 'kUpcDTRdBE',
      password: userData.password,
    }

    const response = await request(serverUrl).post('').send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })


    expect(response.status).toBe(200)
    expect(response.body.errors).toBeDefined()
    expect(response.body.data).toBeNull()
  })
  
})