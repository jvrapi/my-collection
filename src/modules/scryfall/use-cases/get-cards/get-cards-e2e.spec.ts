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
    };

    const getCardsResponse = await request<ScryfallCards>(serverUrl)
      .query(getCardsQuery)
      .variables({ data });

    expect(getCardsResponse.errors).toBeUndefined();
    expect(getCardsResponse.data?.cards).toHaveLength(3);
  });

  it('should be able to get a list of cards filtering by set code', async () => {
    const data = {
      setCode: 'DMU',
    };

    const getCardsResponse = await request<ScryfallCards>(serverUrl)
      .query(getCardsQuery)
      .variables({ data });

    expect(getCardsResponse.errors).toBeUndefined();
    expect(getCardsResponse.data?.cards.length).toBeGreaterThanOrEqual(1);
  });

  it('should be able to get a list of cards filtering by set code', async () => {
    const data = {
      cardType: ['Artifact'],
    };

    const getCardsResponse = await request<ScryfallCards>(serverUrl)
      .query(getCardsQuery)
      .variables({ data });

    expect(getCardsResponse.errors).toBeUndefined();
    expect(getCardsResponse.data?.cards.length).toBeGreaterThanOrEqual(1);
  });

  it('should not be able to get a cards without an filter', async () => {
    const getCardsResponse = await request<ScryfallCards>(serverUrl)
      .query(getCardsQuery)
      .variables({
        data: {},
      });

    expect(getCardsResponse.errors).toBeDefined();
    expect(getCardsResponse.data).toBeNull();
    expect(getCardsResponse.errors![0].extensions.status).toBe('400');
  });

  it('should not be able to get a non exists card', async () => {
    const getCardsResponse = await request<ScryfallCards>(serverUrl)
      .query(getCardsQuery)
      .variables({
        data: {
          name: 'wrong_name',
        },
      });

    expect(getCardsResponse.errors).toBeUndefined();
    expect(getCardsResponse.data?.cards).toHaveLength(0);
  });
});
