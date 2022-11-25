import { ApolloServer } from "@apollo/server";
import chai from 'chai';
import chaiHttp from 'chai-http';
import { randomUUID } from "node:crypto";
import { JwtTokenProvider } from "../../../../providers/token/jwt-token-provider";
import { createApolloServer } from "../../../../server";
import { authenticateUserQuery, createUserQuery, updateUserQuery } from "../../../../tests/graphql/queries";
import { userData } from "../../../../tests/mocks/user";
import { Context } from "../../../../types/context";

chai.use(chaiHttp)

describe('[e2e] Update user', () => {
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
  
  it('should be able to update a user', async () => {
    const data = {
      email: 'kupasahu@abi.pm',
      name: 'Viola Miller',
      username: 'rYfggZjxPW'
    }

    const authenticateData = {
      username: userData.email,
      password: userData.password
    }


    const createUserResponse = await chai
    .request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: {data: userData}
    })

    const authenticateUserResponse = await chai
    .request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data?.authenticateUser?.token

    const updateUserResponse = await chai
    .request(serverUrl)
    .post('')
    .send({
      query: updateUserQuery,
      variables: {data}
    })
    .set('authorization', `Bearer ${token}`)

    expect(updateUserResponse.status).toBe(200)
    expect(updateUserResponse.body.errors).toBeUndefined()
    expect(updateUserResponse.body.data.updateUser.id).toEqual(createUserResponse.body.data.createUser.id)
    expect(updateUserResponse.body.data.updateUser.updatedAt).not.toEqual(createUserResponse.body.data.createUser.updatedAt)
  })

  it('should not be able to update a non existing user',async () => {
    const data = {
      email: 'kupasahu@abi.pm',
      name: 'Viola Miller',
      username: 'rYfggZjxPW'
    }

    const tokenProvider = new JwtTokenProvider()
    
    const token = tokenProvider.generateToken({userId: randomUUID()})
    
    const updateUserResponse = await chai
    .request(serverUrl)
    .post('')
    .send({
      query: updateUserQuery,
      variables: {data}
    })
    .set('authorization', `Bearer ${token}`)
    
    expect(updateUserResponse.status).toBe(200)

    expect(updateUserResponse.body.errors[0].extensions.status).toBe('400')
    
    expect(updateUserResponse.body.errors).toBeDefined()
    
    expect(updateUserResponse.body.data).toBeNull()
  })
  
  it('should not be able to update email if his already in use', async () => {
    const data = {
      email: 'kupasahu@abi.pm',
      name: 'Viola Miller',
      username: 'rYfggZjxPW'
    }

    const otherUserData = {
      email: 'kupasahu@abi.pm',
      name: 'Jorge Craig',
      username: 'rYfggZjxPW',
      password:'t8vaftXQ64'
    }

    const authenticateData = {
      username: userData.email,
      password: userData.password
    }


    await chai
    .request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: {data: userData}
    })

    await chai
    .request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: {data: otherUserData}
    })

    const authenticateUserResponse = await chai
    .request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data?.authenticateUser?.token

    const updateUserResponse = await chai
    .request(serverUrl)
    .post('')
    .send({
      query: updateUserQuery,
      variables: {data}
    })
    .set('authorization', `Bearer ${token}`)

    expect(updateUserResponse.status).toBe(200)

    expect(updateUserResponse.body.errors).toBeDefined()
    
    expect(updateUserResponse.body.errors[0].extensions.status).toBe('400')

    expect(updateUserResponse.body.errors[0].message).toBe('New email already in use')
    
    expect(updateUserResponse.body.data).toBeNull()
  })

  it('should not be able to update username if his already in use', async () => {
    const data = {
      email: userData.email,
      name: userData.name,
      username: 'rYfggZjxPW'
    }

    const otherUserData = {
      email: 'nu@runadli.gu',
      name: 'Jorge Craig',
      username: 'rYfggZjxPW',
      password:'t8vaftXQ64'
    }

    const authenticateData = {
      username: userData.email,
      password: userData.password
    }


    await chai
    .request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: {data: userData}
    })

    await chai
    .request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: { data: otherUserData }
    })

    const authenticateUserResponse = await chai
    .request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data?.authenticateUser?.token

    const updateUserResponse = await chai
    .request(serverUrl)
    .post('')
    .send({
      query: updateUserQuery,
      variables: {data}
    })
    .set('authorization', `Bearer ${token}`)

    expect(updateUserResponse.status).toBe(200)

    expect(updateUserResponse.body.errors).toBeDefined()
    
    expect(updateUserResponse.body.errors[0].extensions.status).toBe('400')

    expect(updateUserResponse.body.errors[0].message).toBe('New username already in use')
    
    expect(updateUserResponse.body.data).toBeNull()
  })
})