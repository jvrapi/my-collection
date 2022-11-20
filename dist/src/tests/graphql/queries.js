"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserQuery = void 0;
exports.createUserQuery = `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
