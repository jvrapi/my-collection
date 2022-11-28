import { ApolloServer } from "@apollo/server";
import FakeTimers from "@sinonjs/fake-timers";
import { randomUUID } from "crypto";
import request from 'supertest';
import { JwtTokenProvider } from "../../../../providers/token/jwt-token-provider";
import { createApolloServer } from "../../../../server";
import { authenticateUserQuery, createUserQuery, updateUserQuery } from "../../../../tests/graphql/mutations";
import { userData } from "../../../../tests/mocks/user";
import { Context } from "../../../../types/context";

describe('[e2e] Update user', () => {
  let testServer: ApolloServer<Context>
  let serverUrl: string
  
  beforeAll(async () => {
    const {server, url}= await createApolloServer()
    testServer = server
    serverUrl = url
  })
  
  afterAll(async () => {
    await testServer.stop()
  })

  it('should not be able to update a user without an token', async () => {
    const data = {
      email: 'etvit@ne.ir',
      name: 'Mollie Cook',
      username: 'uxfCtEeuyR'
    }

    const updateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: updateUserQuery,
      variables: {data}
    })



    expect(updateUserResponse.status).toBe(200)

    expect(updateUserResponse.body.errors[0].extensions.status).toBe('401')
    
    expect(updateUserResponse.body.errors).toBeDefined()
    
    expect(updateUserResponse.body.data).toBeNull()
  })

  it('should not be able to update a user with expired token', async () => {
    const clock = FakeTimers.install();

    const createUserData = {
      email: 'ipi@jijacbij.la',
      name: 'Luke Higgins',
      username: 'uSuMsUMear',
      password: 'zoaoGYZn3F'
    }

    const updateUserData = {
      email: createUserData.email,
      name: createUserData.name,
      username: createUserData.username,

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

    const updateUserResponse = await request(serverUrl)
      .post('')
      .send({
        query: updateUserQuery,
        variables: {data: updateUserData}
      })
      .set('authorization', `Bearer ${token}`)


    expect(updateUserResponse.status).toBe(200)

    expect(updateUserResponse.body.errors[0].extensions.status).toBe('401')
        
    expect(updateUserResponse.body.errors).toBeDefined()
        
    expect(updateUserResponse.body.data).toBeNull()
    
    clock.uninstall();
    
  })
  
  it('should be able to update a user', async () => {
    const data = {
      email: 'hithasmo@fiz.cf',
      name: 'Helen Moore',
      username: 'PZgyIIEyGl'
    }

    const authenticateData = {
      username: userData.email,
      password: userData.password
    }


    const createUserResponse = await request(serverUrl)
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

    const token = authenticateUserResponse.body.data?.authenticateUser?.token


    const updateUserResponse = await request(serverUrl)
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
      email: 'kacti@haraak.by',
      name: 'Beulah Osborne',
      username: 'awjYdtKYlb'
    }

    const tokenProvider = new JwtTokenProvider()
    
    const token = tokenProvider.generateToken({userId: randomUUID()})
    
    const updateUserResponse = await request(serverUrl)
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
    
    const otherUserData = {
      email: 'alufivu@gec.bs',
      name: 'Jorge Craig',
      username: 'phybERdEJK',
      password:'t8vaftXQ64'
    }
    
    const data = {
      email: otherUserData.email,
      name: 'Viola Miller',
      username: 'THFVWsCTuz'
    }

    

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

    await request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: {data: otherUserData}
    })

    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data?.authenticateUser?.token

    const updateUserResponse = await request(serverUrl)
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
    
    const otherUserData = {
      email: 'nu@runadli.gu',
      name: 'Jorge Craig',
      username: 'lmlonOaJGZ',
      password:'t8vaftXQ64'
    }

    
    const data = {
      email: 'coahfep@jusudufo.gg',
      name: userData.name,
      username: otherUserData.username
    }

  
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

    await request(serverUrl)
    .post('')
    .send({
      query: createUserQuery,
      variables: { data: otherUserData }
    })

    const authenticateUserResponse = await request(serverUrl)
    .post('')
    .send({
      query: authenticateUserQuery,
      variables: {data: authenticateData}
    })

    const token = authenticateUserResponse.body.data?.authenticateUser?.token

    const updateUserResponse = await request(serverUrl)
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