import { ApolloServer } from 'apollo-server';
import { resolve } from 'node:path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { registerContainers } from './container';
import { ErrorInterceptor as formatError } from './middlewares/ErrorInterceptor';
import { UserResolver } from './resolvers/user-resolver';



export const createApolloServer = async () => {
  registerContainers()

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: resolve(__dirname, './schema.gql'),
    container: Container
  })

  

  const server = new ApolloServer({
    schema,
    context: async ({req}) => ({token: req.headers.authorization}),
    formatError,
  })

  const serverInfo = await server.listen()

  

  console.log(`🚀 Server ready on ${serverInfo.url} 🚀`)

  
  return serverInfo
}



