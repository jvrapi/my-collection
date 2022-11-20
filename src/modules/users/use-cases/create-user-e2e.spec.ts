import { Server } from 'node:http'
import { createApolloServer } from '../../../server'
import { ApolloClient, createApolloClient } from '../../../tests/graphql/client'
import { createUserVariables } from '../../../tests/graphql/data'
import { createUserQuery } from '../../../tests/graphql/queries'
import { UserCreated } from '../../../tests/graphql/types'

describe('[e2e] Create User', () => {
  let testServer: Server
  let client: ApolloClient<unknown>
  
  beforeAll(async () => {
    const {server, url}= await createApolloServer()
    const apolloClient = createApolloClient(url)
    testServer = server
    client = apolloClient
  })

  afterAll(() => {
    testServer.close()
  })
  
  it('should be able to create a new user', async () => {
    const response = await client.mutate<UserCreated>({
      mutation: createUserQuery,
      variables: {data: createUserVariables}
    })


    expect(response.errors).toBeUndefined()
    expect(response.data?.createUser.id).toBeDefined()

  })
})