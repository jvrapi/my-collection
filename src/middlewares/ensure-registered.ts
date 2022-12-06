import { MiddlewareFn } from 'type-graphql';
import { ApiError } from '../errors/Error';
import { PrismaUsersRepository } from '../modules/users/repositories/prisma-users-repository';
import { Context } from '../types/context';

export const EnsureRegistered: MiddlewareFn<Context> = async ({ context }, next) => {
  const usersRepository = new PrismaUsersRepository();
  const user = await usersRepository.findById(context.user.id);
  if (!user) {
    throw new ApiError('unauthorized', 401);
  }

  return next();
};
