import { ApolloServer } from '@apollo/server';
import request from 'supertest-graphql';
import { createApolloServer } from '../../../../server';
import { authenticateUserQuery, createUserQuery } from '../../../../tests/graphql/mutations';
import { UserAuthenticated, UserCreated } from '../../../../tests/graphql/types';
import { userData } from '../../../../tests/mocks/user';
import { Context } from '../../../../types/context';

describe('[e2e] Authenticate user', () => {
  let testServer: ApolloServer<Context>;
  let serverUrl: string;

  beforeAll(async () => {
    const { server, url } = await createApolloServer();

    testServer = server;

    serverUrl = url;

    await request<UserCreated>(serverUrl)
      .mutate(createUserQuery)
      .variables({ data: userData });
  });

  afterAll(async () => {
    await testServer.stop();
  });

  it('should be able to authenticate a user', async () => {
    const authenticateData = {
      username: userData.email,
      password: userData.password,
    };

    const response = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    expect(response.errors).toBeUndefined();
    expect(response.data?.authenticateUser?.token).toBeDefined();
  });

  it('should not be able to authenticate user without username or password', async () => {
    const authenticateData = {
      username: '',
      password: '',
    };

    const response = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    expect(response.errors).toBeDefined();
    expect(response.errors![0].extensions.status).toBe('400');
    expect(response.errors![0].message).toBe('Missing some information');
    expect(response.data).toBeNull();
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const authenticateData = {
      username: userData.email,
      password: 'wrong-password',
    };

    const response = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    expect(response.errors).toBeDefined();
    expect(response.errors![0].extensions.status).toBe('400');
    expect(response.errors![0].message).toBe('Credentials invalid');
    expect(response.data).toBeNull();
  });

  it('should not be able to authenticate user with invalid email', async () => {
    const authenticateData = {
      username: 'ero@aniihpo.uk',
      password: userData.password,
    };

    const response = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    expect(response.errors).toBeDefined();
    expect(response.errors![0].extensions.status).toBe('400');
    expect(response.errors![0].message).toBe('Credentials invalid');
    expect(response.data).toBeNull();
  });

  it('should not be able to authenticate user with invalid username', async () => {
    const authenticateData = {
      username: 'kUpcDTRdBE',
      password: userData.password,
    };

    const response = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    expect(response.errors).toBeDefined();
    expect(response.errors![0].extensions.status).toBe('400');
    expect(response.errors![0].message).toBe('Credentials invalid');
    expect(response.data).toBeNull();
  });
});
