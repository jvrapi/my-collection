"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const apollo_server_1 = require("apollo-server");
require("dotenv/config");
const node_path_1 = require("node:path");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const container_1 = require("./container");
const ErrorInterceptor_1 = require("./middlewares/ErrorInterceptor");
const user_resolver_1 = require("./resolvers/user-resolver");
const createApolloServer = async () => {
    (0, container_1.registerContainers)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [user_resolver_1.UserResolver],
        emitSchemaFile: (0, node_path_1.resolve)(__dirname, './schema.gql'),
        container: typedi_1.Container
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
        context: async ({ req }) => ({ token: req.headers.authorization }),
        formatError: ErrorInterceptor_1.ErrorInterceptor,
    });
    const serverInfo = await server.listen();
    console.log(`🚀 Server ready on ${serverInfo.url} 🚀`);
    return serverInfo;
};
exports.createApolloServer = createApolloServer;
