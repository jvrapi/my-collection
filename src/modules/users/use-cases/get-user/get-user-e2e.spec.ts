import { ApolloServer } from '@apollo/server';
import request from 'supertest-graphql';
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
