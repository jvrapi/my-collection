import { ApolloServer } from '@apollo/server';
import FakeTimers from '@sinonjs/fake-timers';
import { randomUUID } from 'crypto';
import request from 'supertest-graphql';
import { JwtTokenProvider } from '../../../../providers/token/jwt-token-provider';
import { createApolloServer } from '../../../../server';
import { authenticateUserQuery, createUserQuery } from '../../../../tests/graphql/mutations';
import { getUsersQuery } from '../../../../tests/graphql/queries';
import { User, UserAuthenticated } from '../../../../tests/graphql/types';
import { userData } from '../../../../tests/mocks/user';
import { Context } from '../../../../types/context';

describe('[e2e] Get user', () => {
  let testServer: ApolloServer<Context>;
  let serverUrl: string;
  const authenticateData = {
    username: userData.email,
    password: userData.password,
  };

  beforeAll(async () => {
    const { server, url } = await createApolloServer();
    testServer = server;
    serverUrl = url;

    await request(url)
      .mutate(createUserQuery)
      .variables({ data: userData });
  });

  afterAll(async () => {
    await testServer.stop();
  });

  it('should not be able to get a user without an token', async () => {
    const response = await request(serverUrl).query(getUsersQuery);
    expect(response.errors).toBeDefined();
    expect(response.errors![0].extensions.status).toBe('401');
    expect(response.data).toBeNull();
  });

  it('should not be able to get a user with expired token', async () => {
    const clock = FakeTimers.install();

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token;

    await clock.tickAsync(16000);

    const getUserResponse = await request(serverUrl)
      .query(getUsersQuery)
      .set('authorization', `Bearer ${token}`);

    expect(getUserResponse.errors).toBeDefined();
    expect(getUserResponse.errors![0].extensions.status).toBe('401');
    expect(getUserResponse.data).toBeNull();

    clock.uninstall();
  });

  it('should not be able to get a non registered user', async () => {
    const data = {
      email: 'kacti@haraak.by',
      name: 'Beulah Osborne',
      username: 'awjYdtKYlb',
    };

    const tokenProvider = new JwtTokenProvider();

    const token = tokenProvider.generateToken({ userId: randomUUID() });

    const updateUserResponse = await request(serverUrl)
      .query(getUsersQuery)
      .variables({ data })
      .set('authorization', `Bearer ${token}`);

    expect(updateUserResponse.errors).toBeDefined();
    expect(updateUserResponse.errors![0].extensions.status).toBe('401');
    expect(updateUserResponse.data).toBeNull();
  });

  it('should be able to get user', async () => {
    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser.token;

    const getUserResponse = await request<User>(serverUrl)
      .query(getUsersQuery)
      .set('authorization', `Bearer ${token}`);

    expect(getUserResponse.errors).toBeUndefined();
    expect(getUserResponse.data?.user).toBeDefined();
    expect(getUserResponse.data?.user.id).toBeDefined();
    expect(getUserResponse.data?.user.name).toBeDefined();
    expect(getUserResponse.data?.user.email).toBeDefined();
    expect(getUserResponse.data?.user.username).toBeDefined();
    expect(getUserResponse.data?.user.createdAt).toBeDefined();
    expect(getUserResponse.data?.user.username).toBeDefined();
    expect(getUserResponse.data?.user.name).toEqual(userData.name);
    expect(getUserResponse.data?.user.email).toEqual(userData.email);
    expect(getUserResponse.data?.user.username).toEqual(userData.username);
  });
});
