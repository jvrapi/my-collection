import { ApolloServer } from 'apollo-server';
import path from 'node:path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { registerContainers } from './container';
import { ErrorInterceptor as formatError } from './middlewares/ErrorInterceptor';
import { UserResolver } from './resolvers/user-resolver';

async function main(){

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, './schema.gql'),
    container: Container
  })

  registerContainers()

  const server = new ApolloServer({
    schema,
    context: async ({req}) => ({token: req.headers.authorization}),
    formatError,
  })

 const {url}= await server.listen()
  

  console.log(`🚀 Server ready on ${url} 🚀`)
}

main()