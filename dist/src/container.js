"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerContainers = void 0;
const typedi_1 = __importDefault(require("typedi"));
const prisma_users_repository_1 = require("./modules/users/repositories/prisma-users-repository");
const bcrypt_password_provider_1 = require("./providers/password-provider/bcrypt-password-provider");
const registerContainers = () => {
    typedi_1.default.set('usersRepository', new prisma_users_repository_1.PrismaUsersRepository());
    typedi_1.default.set('bcryptProvider', new bcrypt_password_provider_1.BcryptPasswordProvider());
};
exports.registerContainers = registerContainers;
