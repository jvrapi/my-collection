import { ApolloError } from 'apollo-server-errors';

export class ApiError extends ApolloError {
  constructor(message: string, statusCode = 400) {

    super(message, `${statusCode}`);

    Object.defineProperty(this, 'name', { value: 'ApiError' });
  }
}
