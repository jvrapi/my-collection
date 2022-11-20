"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
class ApiError extends apollo_server_errors_1.ApolloError {
    constructor(message, statusCode = 400) {
        super(message, `${statusCode}`);
        Object.defineProperty(this, 'name', { value: 'ApiError' });
    }
}
exports.ApiError = ApiError;
