import { ApolloServer } from '@apollo/server';
import request from 'supertest-graphql';
import { createApolloServer } from '../../../../server';
import { getCardsQuery } from '../../../../tests/graphql/queries';
import { ScryfallCards } from '../../../../tests/graphql/types';
import { Context } from '../../../../types/context';

describe('[e2e] Get cards by name', () => {
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

  it('should be able to get a list of cards filtering by name', async () => {
    const data = {
      name: 'exploration',
      page: 1
    };

    const getCardsResponse = await request<ScryfallCards>(serverUrl)
      .query(getCardsQuery)
      .variables({ data });

    expect(getCardsResponse.errors).toBeUndefined();
    expect(getCardsResponse.data?.cards.items).toHaveLength(1);
  });

  it('should be able to get a list of cards filtering by set code', async () => {
    const data = {
      setCode: 'DMU',
      page: 1
    };

    const getCardsResponse = await request<ScryfallCards>(serverUrl)
      .query(getCardsQuery)
      .variables({ data });

    expect(getCardsResponse.errors).toBeUndefined();
    expect(getCardsResponse.data?.cards.items.length).toBeGreaterThanOrEqual(1);
  });

  it('should be able to get a list of cards filtering by type', async () => {
    const data = {
      cardType: ['Artifact'],
      page: 1
    };

    const getCardsResponse = await request<ScryfallCards>(serverUrl)
      .query(getCardsQuery)
      .variables({ data });

    expect(getCardsResponse.errors).toBeUndefined();
    expect(getCardsResponse.data?.cards.items.length).toBeGreaterThanOrEqual(1);
  });
});
