import { ApolloServer } from 'apollo-server-express'
import {Server} from '../../../app'

const createUserQuery = `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`

const createUserVariables = {
  email: 'zalari@fozorat.bd',
  name: 'Gabriel Figueroa',
  password: '2exyrQcg',
  username: 'QGULNpCoQD'
}


describe('[e2e] Create User', () => {
  let testServer: ApolloServer
  beforeAll(async () => {
    testServer = await Server.createServer()
  })

  afterAll(() => {
    testServer.stop()
  })
  
  it('should be able to create a new user', async () => {
    

    const result = await testServer.executeOperation({
      query: createUserQuery,
      variables: createUserVariables
    })

    console.log(result.data)

    expect(result.errors).toBeUndefined();
  })
})