import { GraphQLFormattedError } from 'graphql';

export const ErrorInterceptor = (formattedError: GraphQLFormattedError): GraphQLFormattedError => ({
  message: formattedError.message,
  extensions: {
    status: formattedError?.extensions?.code,
  },
});
