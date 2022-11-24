import { ApolloServer } from '@apollo/server';
import 'dotenv/config';
import { resolve } from 'node:path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { registerContainers } from './container';
import { ErrorInterceptor as formatError } from './middlewares/ErrorInterceptor';
import { AuthResolver } from './resolvers/auth-resolver';
import { UserResolver } from './resolvers/user-resolver';
import { Context } from './types/context';
import { startStandaloneServer } from '@apollo/server/standalone';



export const createApolloServer = async () => {
  registerContainers()

  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver],
    emitSchemaFile: resolve(__dirname, './schema.gql'),
    container: Container,
  })


  

  const server = new ApolloServer<Context>({
    schema,
    formatError
  })

  const {url} = await startStandaloneServer(server, {
    context: async ({req}) => ({token: req.headers.authorization, user: {id: ''}}),
    
  })

  console.log(`🚀 Server ready on ${url} 🚀`)

  
  return {server, url}
}



