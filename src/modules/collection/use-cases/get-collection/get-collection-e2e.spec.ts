import { ApolloServer } from '@apollo/server';
import request from 'supertest-graphql';
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

  const filters = {
    page: 1,
    limit: 5
  };

  beforeAll(async () => {
    const { server, url } = await createApolloServer();
    testServer = server;
    serverUrl = url;
  });

  afterAll(async () => {
    await testServer.stop();
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
      .variables({ data: filters })
      .set('Authorization', `Bearer ${token}`);

    expect(getUserCardsResponse.data?.user.cards.items).toHaveLength(1);
    expect(getUserCardsResponse.data?.user.cards.pagination).toBeDefined();
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
      .variables({
        data: {
          username: user.email,
          password: user.password,
        }
      });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    const getUserCardsResponse = await request<User>(serverUrl)
      .query(getUserCardsQuery)
      .variables({ data: filters })
      .set('Authorization', `Bearer ${token}`);

    expect(getUserCardsResponse.data?.user.cards.items).toHaveLength(0);
  });
});
