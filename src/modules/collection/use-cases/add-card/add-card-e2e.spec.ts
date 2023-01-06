import { ApolloServer } from '@apollo/server';
import request from 'supertest-graphql';
import { createApolloServer } from '../../../../server';
import { addCardQuery, authenticateUserQuery, createUserQuery } from '../../../../tests/graphql/mutations';
import { CardAdded, UserAuthenticated } from '../../../../tests/graphql/types';
import { userData } from '../../../../tests/mocks/user';
import { Context } from '../../../../types/context';

describe('[unit] Add card to collection', () => {
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

  it('should be able to add card to collection', async () => {
    const addCardData = {
      quantity: 1,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c',
    };

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    const addCardResponse = await request<CardAdded>(serverUrl)
      .mutate(addCardQuery)
      .variables({ data: addCardData })
      .set('authorization', `Bearer ${token}`);

    expect(addCardResponse.data?.addCard.id).toBeDefined();
    expect(addCardResponse.data?.addCard.imageUrl).toBeDefined();
    expect(addCardResponse.data?.addCard.addedAt).toBeDefined();
    expect(addCardResponse.data?.addCard.quantity).toBeDefined();
  });

  it('should not be able to add card to collection without an quantity', async () => {
    const addCardData = {
      quantity: 0,
      cardId: 'ce4c6535-afea-4704-b35c-badeb04c4f4c',
    };

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    const addCardResponse = await request<CardAdded>(serverUrl)
      .mutate(addCardQuery)
      .variables({ data: addCardData })
      .set('authorization', `Bearer ${token}`);

    expect(addCardResponse.errors).toBeDefined();
    expect(addCardResponse.errors![0].extensions.status).toBe('400');
    expect(addCardResponse.errors![0].message).toBe('You need to provide an quantity');
    expect(addCardResponse.data).toBeNull();
  });

  it('should not be able to add card to collection without an card id', async () => {
    const addCardData = {
      quantity: 1,
      cardId: '',
    };

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    const addCardResponse = await request<CardAdded>(serverUrl)
      .mutate(addCardQuery)
      .variables({ data: addCardData })
      .set('authorization', `Bearer ${token}`);

    expect(addCardResponse.data).toBeNull();
    expect(addCardResponse.errors).toBeDefined();
    expect(addCardResponse.errors![0].extensions.status).toBe('400');
    expect(addCardResponse.errors![0].message).toBe('You need to provide an card');
  });

  it('should not be able to add card to collection with invalid card', async () => {
    const addCardData = {
      quantity: 1,
      cardId: 'wrong_id',
    };

    const authenticateUserResponse = await request<UserAuthenticated>(serverUrl)
      .mutate(authenticateUserQuery)
      .variables({ data: authenticateData });

    const token = authenticateUserResponse.data?.authenticateUser?.token as string;

    const addCardResponse = await request<CardAdded>(serverUrl)
      .mutate(addCardQuery)
      .variables({ data: addCardData })
      .set('authorization', `Bearer ${token}`);

    expect(addCardResponse.data).toBeNull();
    expect(addCardResponse.errors).toBeDefined();
    expect(addCardResponse.errors![0].extensions.status).toBe('400');
    expect(addCardResponse.errors![0].message).toBe('Invalid card');
  });

  it('should not be able to add an card to collection if his already in collection', async () => {
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

    const addCardResponse = await request<CardAdded>(serverUrl)
      .mutate(addCardQuery)
      .variables({ data: addCardData })
      .set('authorization', `Bearer ${token}`);

    expect(addCardResponse.data).toBeNull();
    expect(addCardResponse.errors).toBeDefined();
    expect(addCardResponse.errors![0].extensions.status).toBe('400');
    expect(addCardResponse.errors![0].message).toBe('This card already in your collection');
  });
});
