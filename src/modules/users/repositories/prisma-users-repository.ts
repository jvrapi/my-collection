import { User } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { CreateUser, UpdateUser, UsersRepository } from './users-repository';

export class PrismaUsersRepository implements UsersRepository {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Collection: true,
      },
    });
  }

  findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        Collection: true,
      },
    });
  }

  create(user: CreateUser): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  }

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Collection: true,
      },
    });
  }

  save({
    id, email, name, username,
  }: UpdateUser): Promise<User> {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        username,
        updatedAt: new Date(),
      },
    });
  }
}
