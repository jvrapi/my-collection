import { GraphQLError } from 'graphql';

export class ApiError {
  constructor(message: string, statusCode = 400) {
    throw new GraphQLError(message, {
      extensions: {
        code: statusCode.toString(),
      },
    });
  }
}
