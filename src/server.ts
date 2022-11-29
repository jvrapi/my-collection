import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';
import { resolve } from 'node:path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import './container';
import { ErrorInterceptor as formatError } from './middlewares/error-interceptor';
import { AuthResolver } from './resolvers/auth-resolver';
import { CollectionResolver } from './resolvers/collection-resolver';
import { UserResolver } from './resolvers/user-resolver';
import { Context } from './types/context';



export const createApolloServer = async () => {

  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver, CollectionResolver],
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



