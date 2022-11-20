"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
require("cross-fetch/polyfill");
const server_1 = require("../../../server");
const data_1 = require("../../../tests/graphql/data");
const queries_1 = require("../../../tests/graphql/queries");
chai_1.default.use(chai_http_1.default);
describe('[e2e] Create User', () => {
    let testServer;
    let serverUrl;
    beforeAll(async () => {
        const { server, url } = await (0, server_1.createApolloServer)();
        testServer = server;
        serverUrl = url;
    });
    afterAll(() => {
        testServer.close();
    });
    it('should be able to create a new user', async () => {
        const response = await chai_1.default.request(serverUrl).post('').send({
            query: queries_1.createUserQuery,
            variables: { data: data_1.createUserVariables }
        });
        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data?.createUser.id).toBeDefined();
    });
    // it('should not be able to create a new user with same email', async () => {
    //   await client.mutate<UserCreated>({
    //     mutation: createUserQuery,
    //     variables: {data: createUserVariables},
    //   })
    //  await expect(client.mutate<UserCreated>({
    //     mutation: createUserQuery,
    //     variables: {data: createUserVariables},
    //     errorPolicy: 'all'
    //   })).rejects.toThrow()
    // })
});
