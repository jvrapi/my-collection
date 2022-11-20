"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsersRepository = void 0;
const prisma_1 = require("../../../database/prisma");
class PrismaUsersRepository {
    findByEmailOrUsername(email, username) {
        return prisma_1.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: {
                            equals: email
                        }
                    },
                    {
                        username: {
                            contains: username.toLowerCase()
                        }
                    }
                ]
            }
        });
    }
    create(user) {
        return prisma_1.prisma.user.create({
            data: user,
        });
    }
}
exports.PrismaUsersRepository = PrismaUsersRepository;
