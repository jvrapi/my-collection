import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import http from 'node:http';
import path from 'node:path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './graphql/resolvers/user-resolver';
import { app } from './http/app';

async function main(){

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, './graphql/schema.gql')
  })

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
  })

  await server.start()
  
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));



  console.log(`🚀 Server ready on http://localhost:4000${server.graphqlPath} 🚀`)
}




main()