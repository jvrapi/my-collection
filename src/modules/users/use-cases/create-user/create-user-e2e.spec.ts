import { ApolloServer } from '@apollo/server';

import request from 'supertest';
import { createApolloServer } from '../../../../server';
import { createUserQuery } from '../../../../tests/graphql/mutations';
import { userData } from '../../../../tests/mocks/user';
import { Context } from '../../../../types/context';


describe('[e2e] Create User', () => {
  let testServer: ApolloServer<Context>
  let serverUrl: string
  
  beforeAll(async () => {
    const {server, url}= await createApolloServer()
    testServer = server
    serverUrl = url
  })

  afterAll(() => {
    testServer.stop()
  })
  
  it('should be able to create a new user', async () => {
  

    const response =  await request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: userData}
    })


    expect(response.status).toBe(200)
    expect(response.body.errors).toBeUndefined()
    expect(response.body.data?.createUser.id).toBeDefined()

  })

  it('should not be able to create a new user with same email', async () => {
    await request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: userData}
    })


    const response = await request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: {
        ...userData,
        username: 'fGsRjHXoRq'
      }}
    })

    expect(response.status).toBe(200)
    
    expect(response.body.errors).toBeDefined()
    expect(response.body.data?.createUser.id).toBeUndefined()

  })


  it('should not be able to create a new user with same username', async () => {
    await request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: userData}
    })


    const response = await request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: {
        ...userData,
        email: 'noteju@kosufawav.pe'
      }}
    })

    expect(response.status).toBe(200)
    expect(response.body.errors).toBeDefined()
    expect(response.body.data?.createUser.id).toBeUndefined()

  })
})