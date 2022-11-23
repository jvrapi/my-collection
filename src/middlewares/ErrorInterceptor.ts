import { GraphQLFormattedError } from "graphql";


export const ErrorInterceptor = (formattedError: GraphQLFormattedError): GraphQLFormattedError => {
  return {
    message: formattedError.message,
    extensions: {
      status: formattedError?.extensions?.code,
    }
  }



  
}