import { ApolloServer } from "@apollo/server";
import FakeTimers from "@sinonjs/fake-timers";
import { randomUUID } from "node:crypto";
import request from 'supertest-graphql';
import { JwtTokenProvider } from "../../../../providers/token/jwt-token-provider";
import { createApolloServer } from "../../../../server";
import { authenticateUserQuery, createUserQuery, updateUserQuery } from "../../../../tests/graphql/mutations";
import { UserAuthenticated, UserCreated, UserUpdated } from "../../../../tests/graphql/types";
import { userData } from "../../../../tests/mocks/user";
import { Context } from "../../../../types/context";

describe('[e2e] Update user', () => {
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

    const updateUserResponse = await request<UserUpdated>(serverUrl)
    .mutate(updateUserQuery)
    .variables({data})

    expect(updateUserResponse.errors).toBeDefined()
    expect(updateUserResponse.errors![0].extensions.status).toBe('401')
    expect(updateUserResponse.data).toBeNull()
  })

  it('should not be able to update a user with expired token', async () => {
    const clock = FakeTimers.install();

    const data = {
      email: userData.email,
      name: userData.name,
      username: userData.username,
    }

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
    .mutate(authenticateUserQuery)
    .variables({data: authenticateData})

    const token = authenticateUserResponse.data?.authenticateUser?.token


    await clock.tickAsync(16000);

    const updateUserResponse = await request<UserUpdated>(serverUrl)
    .mutate(updateUserQuery)
    .variables({data})
    .set('authorization', `Bearer ${token}`)

    expect(updateUserResponse.errors).toBeDefined()
    expect(updateUserResponse.errors![0].extensions.status).toBe('401')
    expect(updateUserResponse.data).toBeNull()
    
    clock.uninstall();
    
  })

  it('should not be able to update a non registered user',async () => {
    const data = {
      email: 'kacti@haraak.by',
      name: 'Beulah Osborne',
      username: 'awjYdtKYlb'
    }

    const tokenProvider = new JwtTokenProvider()
    
    const token = tokenProvider.generateToken({userId: randomUUID()})
    
    const updateUserResponse = await request<UserUpdated>(serverUrl)
    .mutate(updateUserQuery)
    .variables({data})
    .set('authorization', `Bearer ${token}`)

    expect(updateUserResponse.errors).toBeDefined()
    expect(updateUserResponse.errors![0].extensions.status).toBe('401')
    expect(updateUserResponse.data).toBeNull()
  })

  it('should be able to update a user', async () => {
    const data = {
      email: 'hithasmo@fiz.cf',
      name: 'Helen Moore',
      username: 'PZgyIIEyGl'
    }


    const createUserResponse = await request<UserCreated>(serverUrl)
    .mutate(createUserQuery)
    .variables({data: userData})


    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
    .mutate(authenticateUserQuery)
    .variables({data: authenticateData})

    const token = authenticateUserResponse.data?.authenticateUser?.token


    const updateUserResponse = await request<UserUpdated>(serverUrl)
    .mutate(updateUserQuery)
    .variables({data})
    .set('authorization', `Bearer ${token}`)

    expect(updateUserResponse.errors).toBeUndefined()
    expect(updateUserResponse.data?.updateUser.id).toEqual(createUserResponse.data?.createUser.id)
    expect(updateUserResponse.data?.updateUser.updatedAt).not.toEqual(createUserResponse.data?.createUser.updatedAt)
    expect(updateUserResponse.data?.updateUser.email).toEqual(data.email)
    expect(updateUserResponse.data?.updateUser.username).toEqual(data.username)
    expect(updateUserResponse.data?.updateUser.name).toEqual(data.name)
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

    await request<UserCreated>(serverUrl)
    .mutate(createUserQuery)
    .variables({data: userData})
   

    await request<UserCreated>(serverUrl)
    .mutate(createUserQuery)
    .variables({data: otherUserData})
    

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
    .mutate(authenticateUserQuery)
    .variables({data: authenticateData})



    const token = authenticateUserResponse.data?.authenticateUser?.token


    const updateUserResponse = await request<UserUpdated>(serverUrl)
    .mutate(updateUserQuery)
    .variables({data})
    .set('authorization', `Bearer ${token}`)


    expect(updateUserResponse.errors).toBeDefined()
    expect(updateUserResponse.errors![0].extensions.status).toBe('400')
    expect(updateUserResponse.errors![0].message).toBe('New e-mail already in use')
    expect(updateUserResponse.data).toBeNull()
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

    await request<UserCreated>(serverUrl)
    .mutate(createUserQuery)
    .variables({data: userData})

    await request<UserCreated>(serverUrl)
    .mutate(createUserQuery)
    .variables({data: otherUserData})
    

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
    .mutate(authenticateUserQuery)
    .variables({data: authenticateData})

    const token = authenticateUserResponse.data?.authenticateUser?.token


    const updateUserResponse = await request<UserUpdated>(serverUrl)
    .mutate(updateUserQuery)
    .variables({data})
    .set('authorization', `Bearer ${token}`)


    expect(updateUserResponse.errors).toBeDefined()
    expect(updateUserResponse.errors![0].extensions.status).toBe('400')
    expect(updateUserResponse.errors![0].message).toBe('New username already in use')
    expect(updateUserResponse.data).toBeNull()
  })
})