"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUsersRepository = void 0;
const node_crypto_1 = require("node:crypto");
class InMemoryUsersRepository {
    constructor() {
        this.users = [];
    }
    async create({ email, name, password, username }) {
        const id = (0, node_crypto_1.randomUUID)();
        const user = {
            email,
            name,
            username,
            password,
            id,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.push(user);
        return user;
    }
    async findByEmailOrUsername(email, username) {
        const user = this.users.find(user => user.email === email || user.username === username);
        if (user) {
            return user;
        }
        return null;
    }
}
exports.InMemoryUsersRepository = InMemoryUsersRepository;
