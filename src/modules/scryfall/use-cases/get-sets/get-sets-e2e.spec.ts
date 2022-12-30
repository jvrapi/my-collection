import { ApolloServer } from '@apollo/server';
import request from 'supertest-graphql';
import { createApolloServer } from '../../../../server';
import { getSetsQuery } from '../../../../tests/graphql/queries';
import { ScryfallSets } from '../../../../tests/graphql/types';
import { Context } from '../../../../types/context';

describe('[e2e] Get sets', () => {
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

  it('should be able to get a set list', async () => {
    const data = {
      page: 1,
      limit: 5
    };
    const response = await request<ScryfallSets>(serverUrl)
      .query(getSetsQuery)
      .variables({ data });
      
    expect(response.data?.sets.items).toBeDefined();
    expect(response.data?.sets.pagination.currentPage).toBeDefined();
    expect(response.data?.sets.pagination.nextPage).toBeDefined();
    expect(response.data?.sets.pagination.currentPage).toBeDefined();
    expect(response.data?.sets.pagination.totalItems).toBeDefined();
    expect(response.data?.sets.pagination.prevPage).toBeNull();
  });
});
