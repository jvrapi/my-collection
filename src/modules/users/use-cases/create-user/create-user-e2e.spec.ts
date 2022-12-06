import { ApolloServer } from '@apollo/server';

import request from 'supertest-graphql';
import { createApolloServer } from '../../../../server';
import { createUserQuery } from '../../../../tests/graphql/mutations';
import { UserCreated } from '../../../../tests/graphql/types';
import { userData } from '../../../../tests/mocks/user';
import { Context } from '../../../../types/context';

describe('[e2e] Create User', () => {
  let testServer: ApolloServer<Context>;
  let serverUrl: string;

  beforeAll(async () => {
    const { server, url } = await createApolloServer();
    testServer = server;
    serverUrl = url;
  });

  afterAll(async () => {
    await testServer.stop();
  });

  it('should be able to create a new user', async () => {
    const response = await request<UserCreated>(serverUrl)
      .mutate(createUserQuery)
      .variables({ data: userData });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createUser.id).toBeDefined();
  });

  it('should not be able to create a new user with same email', async () => {
    await request<UserCreated>(serverUrl)
      .mutate(createUserQuery)
      .variables({ data: userData });

    const response = await request<UserCreated>(serverUrl)
      .mutate(createUserQuery)
      .variables({
        data: {
          ...userData,
          username: 'fGsRjHXoRq',
        },
      });

    expect(response.errors!).toBeDefined();
    expect(response.errors![0].extensions.status).toBe('400');
    expect(response.errors![0].message).toBe('E-mail already in use');
    expect(response.data?.createUser).toBeUndefined();
  });

  it('should not be able to create a new user with same username', async () => {
    await request<UserCreated>(serverUrl)
      .mutate(createUserQuery)
      .variables({ data: userData });

    const response = await request<UserCreated>(serverUrl)
      .mutate(createUserQuery)
      .variables({
        data: {
          ...userData,
          email: 'wuemlo@hup.aw',
        },
      });

    expect(response.errors!).toBeDefined();
    expect(response.errors![0].extensions.status).toBe('400');
    expect(response.errors![0].message).toBe('Username already in use');
    expect(response.data?.createUser).toBeUndefined();
  });
});
