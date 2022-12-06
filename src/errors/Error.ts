import { GraphQLError } from 'graphql';

export class ApiError extends GraphQLError {
  constructor(message: string, statusCode = 400) {
    super(message, {
      extensions: {
        status: statusCode.toString(),
      },
    });
    this.extensions.status = statusCode.toString();
  }
}
