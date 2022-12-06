import { ApolloServer } from '@apollo/server';
import FakeTimers from '@sinonjs/fake-timers';
import { randomUUID } from 'node:crypto';
import request from 'supertest-graphql';
import { JwtTokenProvider } from '../../../../providers/token/jwt-token-provider';
import { createApolloServer } from '../../../../server';
import { addCardQuery, authenticateUserQuery, createUserQuery } from '../../../../tests/graphql/mutations';
import { getUserCardsQuery } from '../../../../tests/graphql/queries';
import { User, UserAuthenticated } from '../../../../tests/graphql/types';
import { userData } from '../../../../tests/mocks/user';
import { Context } from '../../../../types/context';

describe('[e2e] Get cards', () => {
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
  });

  afterAll(async () => {
    await testServer.stop();
  });

  it('should not be able to get user cards without an token', async () => {
    const getCardsResponse = await request(serverUrl)
      .query(getUserCardsQuery);

    expect(getCardsResponse.errors).toBeDefined();
    expect(getCardsResponse.errors![0].extensions.status).toBe('401');
    expect(getCardsResponse.data).toBeNull();
  });

  it('should not be able to get user cards with expired token', async () => {
    const clock = FakeTimers.install();

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    await clock.tickAsync(16000);

    const getCardsResponse = await request(serverUrl)
      .query(getUserCardsQuery)
      .set('authorization', `Bearer ${token}`);

    expect(getCardsResponse.errors).toBeDefined();
    expect(getCardsResponse.errors![0].extensions.status).toBe('401');
    expect(getCardsResponse.data).toBeNull();

    clock.uninstall();
  });

  it('should not be able to get a non registered user collection', async () => {
    const tokenProvider = new JwtTokenProvider();

    const token = tokenProvider.generateToken({ userId: randomUUID() });

    const getCardsResponse = await request(serverUrl)
      .mutate(getUserCardsQuery)
      .set('authorization', `Bearer ${token}`);

    expect(getCardsResponse.errors).toBeDefined();
    expect(getCardsResponse.errors![0].extensions.status).toBe('401');
    expect(getCardsResponse.data).toBeNull();
  });

  it('should be able to get user collection cards', async () => {
    await request(serverUrl)
      .mutate(createUserQuery)
      .variables({ data: userData });

    const addCardData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c',
    };

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    await request(serverUrl)
      .mutate(addCardQuery)
      .variables({ data: addCardData })
      .set('authorization', `Bearer ${token}`);

    const getUserCardsResponse = await request<User>(serverUrl)
      .query(getUserCardsQuery)
      .set('Authorization', `Bearer ${token}`);

    expect(getUserCardsResponse.data?.user.cards).toHaveLength(1);
  });

  it('should be able to get user collection with no cards', async () => {
    const user = {
      name: 'Jerry Dean',
      email: 'fa@istuhibo.lv',
      username: 'iBQhSDlUZB',
      password: '3LVWQG986G',
    };

    await request(serverUrl)
      .mutate(createUserQuery)
      .variables({ data: user });

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    const getUserCardsResponse = await request<User>(serverUrl)
      .query(getUserCardsQuery)
      .set('Authorization', `Bearer ${token}`);

    expect(getUserCardsResponse.data?.user.cards).toHaveLength(0);
  });
});
