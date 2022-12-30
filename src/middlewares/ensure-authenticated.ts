import { MiddlewareFn } from 'type-graphql';
import { ApiError } from '../errors/Error';
import { JwtTokenProvider } from '../providers/token/jwt-token-provider';
import { Context } from '../types/context';

export const EnsureAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  const token = context.token?.replace('Bearer', '').trim();
  if (!token) {
    throw new ApiError('unauthorized', 401);
  }

  const tokenProvider = new JwtTokenProvider();

  try {
    const userId = tokenProvider.checkToken({ token });
    context.user.id = userId;
  } catch (error) {
    throw new ApiError('unauthorized', 401);
  }

  return next();
};
