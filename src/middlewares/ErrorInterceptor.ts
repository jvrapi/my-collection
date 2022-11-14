import { GraphQLError, GraphQLFormattedError } from "graphql";


export const ErrorInterceptor = (error: GraphQLError): GraphQLFormattedError => {
  return {
    message: error.message,
    extensions: {
      status: error.extensions.code,
    }
  }
}