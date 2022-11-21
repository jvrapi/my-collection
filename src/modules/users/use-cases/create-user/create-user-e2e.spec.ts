import chai from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'node:http';
import { createApolloServer } from '../../../../server';
import { createUserVariables } from '../../../../tests/graphql/data';
import { createUserQuery } from '../../../../tests/graphql/queries';
chai.use(chaiHttp)


describe('[e2e] Create User', () => {
  let testServer: Server
  let serverUrl: string
  
  beforeAll(async () => {
    const {server, url}= await createApolloServer()
    testServer = server
    serverUrl = url
  })

  afterAll(() => {
    testServer.close()
  })
  
  it('should be able to create a new user', async () => {
  

    const response =  await chai.request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: createUserVariables}
    })


    expect(response.status).toBe(200)
    expect(response.body.errors).toBeUndefined()
    expect(response.body.data?.createUser.id).toBeDefined()

  })

  it('should not be able to create a new user with same email', async () => {
    await chai.request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: createUserVariables}
    })


    const response = await chai.request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: {
        ...createUserVariables,
        username: 'fGsRjHXoRq'
      }}
    })

    expect(response.status).toBe(200)
    
    expect(response.body.errors).toBeDefined()
    expect(response.body.data?.createUser.id).toBeUndefined()

  })


  it('should not be able to create a new user with same username', async () => {
    await chai.request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: createUserVariables}
    })


    const response = await chai.request(serverUrl).post('').send({
      query: createUserQuery,
      variables: {data: {
        ...createUserVariables,
        email: 'noteju@kosufawav.pe'
      }}
    })

    expect(response.status).toBe(200)
    
    expect(response.body.errors).toBeDefined()
    expect(response.body.data?.createUser.id).toBeUndefined()

  })
})