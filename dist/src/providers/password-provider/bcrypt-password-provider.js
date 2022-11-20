"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptPasswordProvider = void 0;
const bcrypt_1 = require("bcrypt");
class BcryptPasswordProvider {
    hashPassword(password) {
        return (0, bcrypt_1.hash)(password, 8);
    }
    compare(password, hash) {
        return (0, bcrypt_1.compare)(password, hash);
    }
}
exports.BcryptPasswordProvider = BcryptPasswordProvider;
