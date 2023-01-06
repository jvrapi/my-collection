import { ApolloServer } from '@apollo/server';
import { randomUUID } from 'node:crypto';
import request from 'supertest-graphql';
import { createApolloServer } from '../../../../server';
import {
  addCardQuery,
  authenticateUserQuery,
  createUserQuery,
  updateCardsQuery
} from '../../../../tests/graphql/mutations';
import { CardAdded, CardUpdated, UserAuthenticated } from '../../../../tests/graphql/types';
import { userData } from '../../../../tests/mocks/user';
import { Context } from '../../../../types/context';

describe('[e2e] Update cards', () => {
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

    await request(serverUrl)
      .mutate(createUserQuery)
      .variables({ data: userData });
  });

  afterAll(async () => {
    await testServer.stop();
  });

  //   const clock = FakeTimers.install();

  //   const updateCardData = {
  //     quantity: 1,
  //     cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c',
  //   };

  //   const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
  //     .mutate(authenticateUserQuery)
  //     .variables({ data: authenticateData });

  //   const token = authenticateUserResponse.data?.authenticateUser?.token as string;

  //   await clock.tickAsync(16000);

  //   const updateCardToCollectionResponse = await request(serverUrl)
  //     .mutate(updateCardsQuery)
  //     .variables({ data: updateCardData })
  //     .set('authorization', `Bearer ${token}`);

  //   console.log(updateCardToCollectionResponse.errors);

  //   expect(updateCardToCollectionResponse.errors).toBeDefined();
  //   expect(updateCardToCollectionResponse.errors![0].extensions.status).toBe('401');
  //   expect(updateCardToCollectionResponse.data).toBeNull();

  //   clock.uninstall();
  // });

  it('should be able to update quantity of an card in collection', async () => {
    const addCardData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c',
    };

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    await request<CardAdded>(serverUrl)
      .mutate(addCardQuery)
      .variables({ data: addCardData })
      .set('authorization', `Bearer ${token}`);

    const updateCardsResponse = await request<CardUpdated>(serverUrl)
      .mutate(updateCardsQuery)
      .variables({
        data: [
          {
            quantity: 2,
            cardId: addCardData.cardId,
          },
        ],
      })
      .set('authorization', `Bearer ${token}`);

    expect(updateCardsResponse.errors).toBeUndefined();
    expect(updateCardsResponse.data?.updateCards).toBeDefined();
    expect(updateCardsResponse.data?.updateCards[0].quantity).toEqual(2);
  });

  it('should not be able to update with empty array', async () => {
    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    const updateCardsResponse = await request<CardUpdated>(serverUrl)
      .mutate(updateCardsQuery)
      .variables({ data: [] })
      .set('authorization', `Bearer ${token}`);

    expect(updateCardsResponse.data).toBeNull();
    expect(updateCardsResponse.errors).toBeDefined();
    expect(updateCardsResponse.errors![0].extensions.status).toBe('400');
    expect(updateCardsResponse.errors![0].message).toBe('You need to provide at least an card to be updated');
  });

  it('should not be able to update with empty array', async () => {
    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    const updateCardsResponse = await request<CardUpdated>(serverUrl)
      .mutate(updateCardsQuery)
      .variables({
        data: [
          {
            cardId: randomUUID(),
            quantity: 1,
          },
        ],
      })
      .set('authorization', `Bearer ${token}`);

    expect(updateCardsResponse.data).toBeNull();
    expect(updateCardsResponse.errors).toBeDefined();
    expect(updateCardsResponse.errors![0].extensions.status).toBe('400');
    expect(updateCardsResponse.errors![0].message).toBe('Some card is not in collection');
  });
});
